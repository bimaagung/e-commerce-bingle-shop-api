const { Item, Category, Sequelize } = require('./../models');
const category_uc = require('../usecase/category');

module.exports = {
  // TODO: show item existing stock
  getListItem: async (category) => {
    let options = {};

    if (typeof category !== 'undefined' || category !== null) {
      options.where = category;
    }

    let item = await Item.findAll({
      attributes: { exclude: ['category_id'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    console.log(options);
    return item;
  },

  getItemById: async (id) =>
    await Item.findOne({
      attributes: { exclude: ['category_id'] },
      where: id,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    }),

  addItem: async (item) => await Item.create(item),

  updateItem: async (id, item) =>
    await Item.update(item, { where: { id: id } }),

  deleteItem: async (id) => await Item.destroy({ where: { id: id } }),
};
