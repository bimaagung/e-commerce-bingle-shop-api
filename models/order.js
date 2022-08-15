'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: 'customerId',
      });
      Order.belongsTo(models.Item, {
        foreignKey: 'itemId',
      });
    }
  }
  Order.init(
    {
      orderId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      totalItem: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: { type: DataTypes.INTEGER, defaultValue: 0 },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
      timestamps: true,
    },
  );
  return Order;
};
