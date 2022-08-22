'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    // static associate(models) {
    //   this.belongsTo(models.OrderDetail, { foreignKey: 'item_id' });
    // }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Item',
    },
  );
  return Item;
};
