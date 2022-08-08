const { Item } = require('../models');

const get_all_item = async (req, res, next) => {
  try {
    const item = await Item.findAll();

    if (!item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Items not found',
        data: item,
      });
    }

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
    const item_id = req.params['itemId'];

    const item = await Item.findOne({ where: { itemId: item_id } });

    if (!item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Item not found',
      });
    }

    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// TODO : Remove property sold

const add_item = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      status: 'ok',
      message: 'Success',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const update_item = async (req, res, next) => {
  try {
    const item_id = req.params['itemId'];

    const item = await Item.findOne({ where: { itemId: item_id } });

    if (!item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Item not found',
        data: item,
      });
    }

    await Item.update(req.body, {
      where: {
        itemId: item_id,
      },
    });

    res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const delete_item = async (req, res, next) => {
  try {
    const item_id = req.params['itemId'];

    const item = await Item.findOne({ where: { itemId: item_id } });

    if (!item) {
      return res.status(404).json({
        status: 'failed',
        message: 'Item not found',
      });
    }

    await Item.destroy({
      where: {
        itemId: item_id,
      },
    });

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
