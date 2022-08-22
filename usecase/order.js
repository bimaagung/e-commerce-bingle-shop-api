const { Order, OrderDetail } = require('../models');
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
  return await Order.findOne({
    where: {
      user_id: user_id,
      status: order_constant.ORDER_PENDING,
    },
  });
};

const addDetailOrder = async (order_id, items) => {
  // looping list item
  for (let i = 0; i < items.length; i++) {
    if (items[i].qty < 1) {
      continue;
    }

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

const statusSubmitOrder = async (user_id, status) => {
  let order_user_id = await getOrderPendingByUserId(user_id);

  // check order is existing
  if (order_user_id === null) {
    return order_user_id;
  }

  return await Order.update(
    { status: status },
    { where: { id: order_user_id.id } },
  );
};

const listOrderPendingCompleted = async () => {
  let orders = await Order.findAll({
    where: {
      [Op.or]: [
        { status: order_constant.ORDER_COMPLETED },
        { status: order_constant.ORDER_PENDING },
      ],
    },
  });

  if (orders === null) {
    orders = [];
  }

  return orders;
};

const listOrderExcludePending = async () => {
  let orders = await Order.findAll({
    where: {
      [Op.or]: [
        { status: order_constant.ORDER_COMPLETED },
        { status: order_constant.ORDER_CANCELED },
      ],
    },
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

  if (order_by_id === null) {
    return order_by_id;
  }

  return await Order.update({ status: status }, { where: { id: order_id } });
};

const reduceStockOrder = async (order_id) => {};

module.exports = {
  createOrder,
  getOrderPendingByUserId,
  addDetailOrder,
  statusSubmitOrder,
  reduceStockOrder,
  listOrderPendingCompleted,
  listOrderExcludePending,
  updateStatusOrder,
};
