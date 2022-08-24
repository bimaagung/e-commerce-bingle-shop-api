const { Order, OrderDetail, User, Item, sequelize } = require('../models');
const { Op } = require('sequelize');

const item_uc = require('../usecase/item');
const order_constant = require('../internal/constant/order.constant');

const createOrder = async (user_id, items) => {
  //object order
  let order = {
    user_id: user_id,
    status: order_constant.ORDER_PENDING,
  };

  // create order user
  await Order.create(order);

  // get order pending by user id
  let order_user_id = await getOrderPendingByUserId(user_id);

  // add order detail per item
  await addDetailOrder(order_user_id.id, items);

  return order_user_id;
};

const getOrderPendingByUserId = async (user_id) => {
  let order = await Order.findOne({
    where: {
      user_id: user_id,
      status: order_constant.ORDER_PENDING,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'telp', 'address'],
      },
      {
        model: OrderDetail,
        as: 'order_details',
        attributes: ['id', 'item_id', 'qty', 'total_price'],
      },
    ],
  });

  // for check order pending before create order
  if (order === null) {
    return null;
  }
  // get sum qty and price order detail by order id
  let total_qty_price = await totalQtyPriceOrder(order.id);

  // for check order pending before create order
  if (total_qty_price === null) {
    return order;
  }

  let order_data = order.dataValues;

  // add total qty order and total price order
  order_data.total_qty_order = parseInt(total_qty_price.qty);
  order_data.total_price_order = parseInt(total_qty_price.total_price);

  return {
    ...order_data,
  };
};

const totalQtyPriceOrder = async (order_id) => {
  return await OrderDetail.findOne({
    attributes: [
      [sequelize.fn('sum', sequelize.col('qty')), 'qty'],
      [sequelize.fn('sum', sequelize.col('total_price')), 'total_price'],
    ],
    group: ['order_id'],
    where: { order_id: order_id },
  });
};

const addDetailOrder = async (order_id, items) => {
  // looping list item
  for (let i = 0; i < items.length; i++) {
    if (items[i].qty < 1) {
      continue;
    }
    console.log(items[i]);
    // get item by id in db
    let item = await item_uc.getItemById(items[i].id);

    // if item existing
    if (item !== null) {
      let result_order = {
        order_id: order_id,
        item_id: items[i].item_id,
        qty: items[i].qty,
        total_price: item.price * items[i].qty,
      };

      await OrderDetail.create(result_order);
    }
  }
};

const listOrderDetailByUserId = async (order_id) =>
  await OrderDetail.findAll({ where: { order_id: order_id } });

const listOrderPendingCompleted = async () => {
  let orders = await Order.findAll({
    where: {
      [Op.or]: [
        { status: order_constant.ORDER_COMPLETED },
        { status: order_constant.ORDER_PENDING },
      ],
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'telp', 'address'],
      },
      {
        model: OrderDetail,
        as: 'order_details',
        attributes: ['id', 'item_id', 'qty', 'total_price'],
      },
    ],
  });

  return orders;
};

const listOrderExcludePending = async () => {
  let orders = await Order.findAll({
    where: {
      [Op.or]: [
        { status: order_constant.ORDER_PROCESSED },
        { status: order_constant.ORDER_SUBMITTED },
      ],
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'telp', 'address'],
      },
      {
        model: OrderDetail,
        as: 'order_details',
        attributes: ['id', 'item_id', 'qty', 'total_price'],
      },
    ],
  });

  if (orders === null) {
    orders = [];
  }
  return orders;
};

const getOrderById = async (order_id) =>
  await Order.findOne({ where: { id: order_id } });

const updateStatusOrder = async (order_id, status) => {
  let order_by_id = await getOrderById(order_id);
  let update_status = null;
  if (order_by_id === null) {
    return order_by_id;
  }

  if (status === order_constant.ORDER_COMPLETED) {
    update_status = await statusCompletedOrder(order_id, status);
  } else if (status === order_constant.ORDER_PROCESSED) {
    update_status = await statusProcessedOrder(order_id, status);
  } else if (status === order_constant.ORDER_CANCELED) {
    update_status = await statusCanceledOrder(order_id, status);
  } else {
    update_status = null;
  }

  return update_status;
};

const statusSubmittedOrder = async (user_id, status) => {
  let order_user_id = await getOrderPendingByUserId(user_id);

  // check order is existing
  if (order_user_id === null) {
    return order_user_id;
  }

  // get list order detail by user id
  let order_detail = await listOrderDetailByUserId(order_user_id.id);

  // reduce stock each item
  order_detail.forEach(async (item) => {
    let item_data = await item_uc.getItemById(item.item_id);

    if (item_data.stock <= 0) {
      return;
    } else {
      await updateStockItem(
        item.item_id,
        item.qty,
        order_constant.ORDER_SUBMITTED,
      );
    }
  });

  // updated status order to submited
  return await Order.update(
    { status: status },
    { where: { id: order_user_id.id } },
  );
};

const statusProcessedOrder = async (order_id, status) =>
  await Order.update({ status: status }, { where: { id: order_id } });

const statusCompletedOrder = async (order_id, status) =>
  await Order.update(
    { status: status, completion_date: new Date() },
    { where: { id: order_id } },
  );

const statusCanceledOrder = async (order_id, status) => {
  // get list order detail by user id
  let order_detail = await listOrderDetailByUserId(order_id);

  // undo reduce stock each item
  order_detail.forEach(async (item) => {
    await updateStockItem(
      item.item_id,
      item.qty,
      order_constant.ORDER_CANCELED,
    );
  });

  // updated status order to canceled
  return await Order.update(
    { status: status, completion_date: null },
    { where: { id: order_id } },
  );
};

const updateStockItem = async (item_id, qty, status) => {
  // get item by item_id
  let item_by_id = await item_uc.getItemById(item_id);

  let cal_stock = 0;
  let cal_sold = 0;

  if (status === order_constant.ORDER_SUBMITTED) {
    // calculate reduce stock item
    cal_stock = item_by_id.stock - qty;
    cal_sold = item_by_id.sold + qty;
  }

  if (status === order_constant.ORDER_CANCELED) {
    // undo reduce stock item
    cal_stock = item_by_id.stock + qty;
    cal_sold = item_by_id.sold - qty;
  }

  // update stock has been submited order
  return await Item.update(
    { stock: cal_stock, sold: cal_sold },
    { where: { id: item_id } },
  );
};

module.exports = {
  createOrder,
  getOrderPendingByUserId,
  addDetailOrder,
  statusSubmittedOrder,
  listOrderPendingCompleted,
  listOrderExcludePending,
  updateStatusOrder,
};
