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
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(225),
        validate: {
          notEmpty: true,
        },
      },
      category: {
        type: DataTypes.STRING(50),
        validate: {
          notEmpty: true,
        },
      },
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Item',
      timestamps: true,
    },
  );
  return Item;
};
