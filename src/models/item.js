const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Order, { foreignKey: 'itemId' });
    }
  }
  Item.init(
    {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      sold: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isNumeric: true,
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
      modelName: 'Item',
      timestamps: false,
    },
  );
  return Item;
};
