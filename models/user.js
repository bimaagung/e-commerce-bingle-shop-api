'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: { name: 'user_id', allowNull: false },
        as: 'orders',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      telp: DataTypes.STRING,
      address: DataTypes.TEXT,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
