const { Order, Item, Customer } = require('../models');
const order_uc = require('../usecase/order');
const res_data = require('../utils/response_data.util');
const order_constant = require('../internal/constant/order.constant');

const createOrder = async (req, res, next) => {
  try {
    // get req user id with params
    let user_id = parseInt(req.params.id);

    // get req items in body
    let items = req.body;

    // get pending by user id in db
    let order_user_id = await order_uc.getOrderPendingByUserId(user_id);

    // check user have order pending
    if (order_user_id !== null) {
      return res
        .status(400)
        .json(res_data.failed('order still pending', order_user_id));
    }

    // create order
    await order_uc.createOrder(user_id, items);

    // get pending by user id in db
    order_user_id = await order_uc.getOrderPendingByUserId(user_id);

    // success create order
    res.status(201).json(res_data.success(order_user_id));
  } catch (error) {
    next(error);
  }
};

const getPendingOrderByUserId = async (req, res, next) => {
  try {
    // get user id with params
    const user_id = parseInt(req.params['id']);

    // get all pending order by user id
    const order = await order_uc.getOrderPendingByUserId(user_id);

    if (order === null) {
      return res.status(400).json(res_data.failed('no order', order));
    }

    res.json(res_data.success(order));
  } catch (error) {
    next(error);
  }
};

const statusSubmittedOrder = async (req, res, next) => {
  try {
    // get user id with params
    const user_id = parseInt(req.params['id']);

    // update status order in db
    let order = await order_uc.statusSubmittedOrder(
      user_id,
      order_constant.ORDER_SUBMITTED,
    );

    if (order === null) {
      return res.status(400).json(res_data.failed('order is empty'));
    }

    res.json(res_data.success());
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getPendingOrderByUserId,
  statusSubmittedOrder,
};
