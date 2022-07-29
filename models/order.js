const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.Item, { foreignKey: 'itemId' });
      Order.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Order.init(
    {
      orderId: {
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
          notEmpty: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      totalItem: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      status: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
      timestamps: false,
    },
  );
  return Order;
};