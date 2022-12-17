const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING,
        /* allowNull: false, */
      },

      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        /* allowNull: false, */
      },

      price: {
        type: DataTypes.INTEGER,
        /* allowNull: false, */
      },

      descriptions: {
        type: DataTypes.STRING,
        /* allowNull: false, */
      },

      imagesForm: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        /* allowNull: false, */
      },

      stock: {
        type: DataTypes.INTEGER,
        /* allowNull: false, */
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
