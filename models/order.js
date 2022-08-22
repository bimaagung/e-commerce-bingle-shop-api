'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
      // this.belongsTo(models.Item, { foreignKey: 'item_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      completion_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
