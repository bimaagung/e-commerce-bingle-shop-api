'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: 'customerId' });
    }
  }
  Customer.init(
    {
      customerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(225),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      telp: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isNumeric: true,
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING(225),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING(500),
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      timestamps: true,
    },
  );
  return Customer;
};
