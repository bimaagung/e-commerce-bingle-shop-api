const { Order, Item, Customer } = require('../models');

const create_order = async (req, res, next) => {
  try {
    //bulk order
    //get id item by req body
    const order_req = req.body;

    // Cross check availability stock of item
    const check_stock = await Item.findOne({
      where: { itemId: order_req['itemId'] },
    });

    // stock item is empty
    if (check_stock.stock === 0) {
      res.status(404).json({
        status: 'failed',
        message: 'Stock item empty',
      });
    }

    //calculate total price by total item
    const cal_total_price = check_stock['price'] * order_req['totalItem'];

    //add value total price in order object
    order_req['totalPrice'] = cal_total_price;

    // add order in db
    const add_order = await Order.create(order_req);

    //get order id from db
    const order_id = add_order.orderId;

    //get order by id from db
    const order_by_id = await Order.findOne({
      attributes: ['orderId', 'totalItem', 'totalPrice', 'status', 'createdAt'],
      where: { orderId: order_id },
      include: [
        {
          model: Customer,
          attributes: ['customerId', 'name', 'telp', 'address'],
        },
        {
          model: Item,
          attributes: ['itemId', 'name', 'category', 'price'],
        },
      ],
    });

    // success add order
    res.status(201).json({
      status: 'ok',
      message: 'Success',
      data: order_by_id,
    });
  } catch (error) {
    next(error);
  }
};

const update_status_order = async (req, res, next) => {
  try {
    // get id order by params
    const order_id = req.params['orderId'];

    //check status update has been accepted
    const get_order_by_id = await Order.findOne({
      where: { orderId: order_id },
    });

    // order not found
    if (!get_order_by_id) {
      return res.status(400).json({
        status: 'failed',
        message: 'Order not found',
      });
    }

    if (get_order_by_id.status > 0) {
      return res.status(401).json({
        status: 'failed',
        message: 'Order has been accepted',
      });
    }

    // get item by id
    const get_item_by_id = await Item.findOne({
      where: { itemId: get_order_by_id.itemId },
    });
    // reduce amount stock
    const reduce_stock_item = get_item_by_id.stock - get_order_by_id.totalItem;

    // add amount sold
    const add_sold_item = get_item_by_id.sold + get_order_by_id.totalItem;

    // update status order is accept
    await Order.update({ status: 1 }, { where: { orderId: order_id } });

    // success update status order
    res.status(200).json({
      status: 'ok',
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

const get_all_order = async (req, res, next) => {
  try {
    //get all order from db
    const all_order = await Order.findAll({
      attributes: ['orderId', 'totalItem', 'totalPrice', 'status', 'createdAt'],
      include: [
        {
          model: Customer,
          attributes: ['customerId', 'name', 'telp', 'address'],
        },
        {
          model: Item,
          attributes: ['itemId', 'name', 'category', 'price'],
        },
      ],
    });

    // order not found
    if (all_order < 1) {
      return res.status(400).json({
        status: 'failed',
        message: 'Order not found',
      });
    }

    //success get all order
    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: all_order,
    });
  } catch (error) {
    next(error);
  }
};

const get_order_by_customerId = async (req, res, next) => {
  try {
    // get customer Id by params
    const customer_id = req.params['customerId'];

    // get order by customer id
    const order = await Order.findAll({ where: { customerId: customer_id } });

    // order not found
    if (order < 1) {
      return res.status(400).json({
        status: 'failed',
        message: 'Order not found',
      });
    }

    //success get order by customer id
    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create_order,
  update_status_order,
  get_all_order,
  get_order_by_customerId,
};
