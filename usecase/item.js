const { Item, Category } = require('./../models');
const { Op } = require('sequelize');

module.exports = {
  // TODO: show item existing stock
  getListItem: async (category) => {
    let options = {};

    if (typeof category !== 'undefined' || category !== null) {
      options.where = category;
    }

    console.log('category', category);

    // get all item without stock 0
    let item = await Item.findAll({
      attributes: { exclude: ['category_id'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      where: {
        category_id: category,
        stock: {
          [Op.gte]: 0,
        },
      },
    });

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
      where: {
        stock: {
          [Op.gte]: 0,
        },
      },
    }),

  addItem: async (item) => await Item.create(item),

  updateItem: async (id, item) =>
    await Item.update(item, { where: { id: id } }),

  deleteItem: async (id) => await Item.destroy({ where: { id: id } }),
};
