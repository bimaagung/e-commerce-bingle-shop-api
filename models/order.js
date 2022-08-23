'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.hasMany(models.OrderDetail, {
        foreignKey: { name: 'order_id', allowNull: false },
        as: 'order_details',
      });

      this.belongsTo(models.User, {
        foreignKey: { name: 'user_id', allowNull: false },
        as: 'user',
      });
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
