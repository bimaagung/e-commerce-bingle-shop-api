'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: { name: 'category_id', allowNull: false },
        as: 'category',
      });
      // this.belongsTo(models.OrderDetail, {
      //   foreignKey: { name: 'item_id', allowNull: false },
      //   as: 'order_detail',
      // });
    }
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
