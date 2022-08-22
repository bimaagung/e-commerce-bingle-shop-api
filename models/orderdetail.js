'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'order_id' });
      // this.hasMany(models.Item, { foreignKey: 'item_id' });
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
