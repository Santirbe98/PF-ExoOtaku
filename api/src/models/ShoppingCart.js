const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "ShoppingCart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      ammount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },

      checkout: {
        type: DataTypes.STRING,
      },

      delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
