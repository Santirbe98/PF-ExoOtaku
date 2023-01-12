const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING,
      },

      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      price: {
        type: DataTypes.INTEGER,
      },

      descriptions: {
        type: DataTypes.STRING,
      },

      imagesForm: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      stock: {
        type: DataTypes.INTEGER,
      },

      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },

      deleted: {
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
