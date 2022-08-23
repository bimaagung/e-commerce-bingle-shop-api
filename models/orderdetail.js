'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: { name: 'order_id', allowNull: false },
        as: 'order',
      });
      // this.hasOne(models.Item, {
      //   foreignKey: { name: 'item_id', allowNull: false },
      //   as: 'item',
      // });
    }
  }
  OrderDetail.init(
    {
      order_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderDetail',
    },
  );
  return OrderDetail;
};
