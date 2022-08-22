const item_uc = require('../usecase/item');
const res_data = require('../utils/response_data.util');
const order_uc = require('../usecase/order');
const category_uc = require('../usecase/category');
const order_constant = require('../internal/constant/order.constant');

const addItem = async (req, res, next) => {
  try {
    // get request body item
    let item = {
      name: req.body.name,
      category_id: req.body.category_id,
      stock: req.body.stock,
      sold: 0,
      price: req.body.price,
    };

    // add item in db
    await item_uc.addItem(item);

    res_data.data = item;

    res.status(201).json(res_data.success());
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    // get id item by params
    const id = parseInt(req.params['id']);

    // get request body item
    let item = {
      name: req.body.name,
      category_id: req.body.category_id,
      stock: req.body.stock,
      price: req.body.price,
    };

    // update item in db
    const update_item = await item_uc.updateItem(id, item);

    // item not found in db
    if (update_item < 1) {
      return res.status(400).json(res_data.failed('Item not found', null));
    }

    // success update item
    res.json(res_data.success(item));
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    // id item by params
    const id = parseInt(req.params['id']);

    //delete item by id item in db
    const delete_item = await item_uc.deleteItem(id);

    // Item not found
    if (!delete_item) {
      return res.status(400).json(res_data.failed('Item not found'));
    }

    // success delete item
    res.json(res_data.success());
  } catch (error) {
    next(error);
  }
};

const getListOrder = async (req, res, next) => {
  try {
    const status = req.query['status'];
    let orders = null;

    if (status === 'completed') {
      orders = await order_uc.listOrderPendingCompleted();
    } else {
      orders = await order_uc.listOrderExcludePending();
    }

    console.log(orders);
    res.json(res_data.success(orders));
  } catch (error) {
    next(error);
  }
};

const updateStatusOrder = async (req, res, next) => {
  // get order id in param
  const order_id = req.params.id;
  // get status in body
  const req_status = req.body.status;

  // get value status order from object order_constant
  let status = order_constant[req_status];

  // check if req body status undefined
  if (status === undefined) {
    return res.status(400).json(res_data.failed('invalid status'));
  }

  // get update status order
  let update_status_order = await order_uc.updateStatusOrder(order_id, status);

  // check if update status is null
  if (update_status_order === null) {
    return res.status(400).json(res_data.failed('Order not found'));
  }

  res.json(res_data.success());
};

const addCategory = async (req, res, next) => {
  try {
    const category = req.body;

    await category_uc.addCategory(category);

    res.json(res_data.success(category));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  getListOrder,
  updateStatusOrder,
  addCategory,
};
