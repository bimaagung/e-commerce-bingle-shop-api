const { Category, Item } = require('./../models');

const getListCategory = async () => {
  return await Category.findAll({
    include: [
      { model: Item, as: 'items', attributes: ['id', 'name', 'stock', 'sold'] },
    ],
  });
};

const getCategoryById = async (id) =>
  await Category.findOne({
    where: { id: id },
    include: [
      { model: Item, as: 'items', attributes: ['id', 'name', 'stock', 'sold'] },
    ],
  });

const getCategoryByName = async (name) =>
  await Category.findOne({ where: { name: name } });

const addCategory = async (name) => {
  let category_by_name = await getCategoryByName(name);

  if (category_by_name !== null) {
    return null;
  }

  return await Category.create({ name });
};

const updateCategory = async (id, name) =>
  await Category.update({ name: name }, { where: { id: id } });

const deleteCategory = async (id) =>
  await Category.destroy({ where: { id: id } });

module.exports = {
  getListCategory,
  getCategoryById,
  getCategoryByName,
  addCategory,
  updateCategory,
  deleteCategory,
};
