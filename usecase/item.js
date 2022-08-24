const { Item, Category } = require('./../models');
const { Op } = require('sequelize');

module.exports = {
  // TODO: show item existing stock
  getListItem: async () => {
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
        stock: {
          [Op.gt]: 0,
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
    }),

  addItem: async (item) => await Item.create(item),

  updateItem: async (id, item) =>
    await Item.update(
      {
        name: item.name,
        category_id: item.category_id,
        stock: item.stock,
        price: item.price,
      },
      { where: { id: id } },
    ),

  deleteItem: async (id) => await Item.destroy({ where: { id: id } }),
};
