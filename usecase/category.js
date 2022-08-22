const { Category } = require('./../models');

module.exports = {
  getListCategory: async () => await Category.findAll(),
  getCategoryById: async (id) => await Category.findOne({ where: id }),
  addCategory: async (category) => await Category.create(category),
  updateCategory: async (id, category) =>
    await Category.update(category, { where: { id: id } }),
  deleteCategory: async (id) => await Category.destroy({ where: id }),
};
