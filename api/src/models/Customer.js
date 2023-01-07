const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      provincia: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      comuna: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      billing_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      isadmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      whishList: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      timestamps: true,
    }
  );
};
