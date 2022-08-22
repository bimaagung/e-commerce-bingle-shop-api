const { Item } = require('./../models');

module.exports = {
  getListItem: async (category) => {
    let options = {};

    if (typeof category !== 'undefined' || category !== null) {
      options.where = category;
    }

    let item = await Item.findAll(options);
    return item;
  },

  getItemById: async (id) => await Item.findOne({ where: id }),

  addItem: async (item) => await Item.create(item),

  updateItem: async (id, item) =>
    await Item.update(item, { where: { id: id } }),

  deleteItem: async (id) => await Item.destroy({ where: { id: id } }),
};
