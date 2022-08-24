const item_uc = require('../usecase/item');
const res_data = require('../utils/response_data.util');

const getListItem = async (req, res, next) => {
  try {
    //get query category
    let category = req.query['category'];
    // filter
    let options = null;

    // check filter
    if (typeof category !== 'undefined') {
      options = category;
    }

    // get list item
    let get_list_item = await item_uc.getListItem(options);

    // TODO : relation not working if existing where

    // item not found
    if (get_list_item < 1) {
      return res
        .status(400)
        .json(res_data.failed('Item not found', get_list_item));
    }

    res.json(res_data.success(get_list_item));
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    // get params id item
    const id = parseInt(req.params['id']);

    // get item by id
    let get_item_by_id = await item_uc.getItemById(id);

    // check item not found
    if (get_item_by_id === null) {
      return res
        .status(400)
        .json(res_data.failed('Item not found', get_item_by_id));
    }

    res.json(res_data.success(get_item_by_id));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListItem,
  getItemById,
};
