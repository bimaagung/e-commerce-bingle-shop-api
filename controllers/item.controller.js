const { Item } = require('../models');

const get_all_item = async (req, res, next) => {
  try {
    // get all item in db
    const item = await Item.findAll();

    // item not found
    if (!item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Items not found',
        data: item,
      });
    }

    // get all item success
    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const get_item_by_id = async (req, res, next) => {
  try {
    // get params id item
    const item_id = req.params['itemId'];

    //get item by id in db
    const item = await Item.findOne({ where: { itemId: item_id } });

    // item not found
    if (!item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Item not found',
      });
    }

    // success get item by id
    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const add_item = async (req, res, next) => {
  try {
    // get request body item
    const item_req = req.body;

    // add key sold in item with default value = 0
    item_req['sold'] = 0;

    // add item in db
    const add_item = await Item.create(item_req);

    // add item success
    res.status(201).json({
      status: 'ok',
      message: 'Success',
      data: add_item,
    });
  } catch (error) {
    next(error);
  }
};

const update_item = async (req, res, next) => {
  try {
    // get id item by params
    const item_id = req.params['itemId'];

    // get request body item
    const item_req = req.body;

    // update item with id in db
    const update_id = await Item.update(item_req, {
      where: {
        itemId: item_id,
      },
    });

    // item not found in db
    if (update_id < 1) {
      return res.status(404).json({
        status: 'failed',
        message: 'Item not found',
      });
    }

    // success update item
    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: item_req,
    });
  } catch (error) {
    next(error);
  }
};

const delete_item = async (req, res, next) => {
  try {
    // id item by params
    const item_id = req.params['itemId'];

    //delete item by id item in db
    const delete_item = await Item.destroy({
      where: {
        itemId: item_id,
      },
    });

    // Item not found
    if (!delete_item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Item not found',
      });
    }

    // success delete item
    console.log(delete_item);
    res.status(200).json({
      status: 'ok',
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_all_item,
  get_item_by_id,
  add_item,
  update_item,
  delete_item,
};
