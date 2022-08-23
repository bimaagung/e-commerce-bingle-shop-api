const res_data = require('../utils/response_data.util');
const category_uc = require('../usecase/category');

const getListCategory = async (req, res, next) => {
  try {
    let categories = await category_uc.getListCategory();

    if (categories < 1) {
      return res
        .status(400)
        .json(res_data.failed('Category not found', categories));
    }

    res.json(res_data.failed(categories));
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    let category = await category_uc.getCategoryById(id);

    if (category === null) {
      return res
        .status(400)
        .json(res_data.failed('Category not found', category));
    }

    res.json(res_data.success(category));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListCategory,
  getCategoryById,
};
