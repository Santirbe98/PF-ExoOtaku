const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "ShoppingList",
    {
      price: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },

      size: {
        type: DataTypes.STRING,
      },

      delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
