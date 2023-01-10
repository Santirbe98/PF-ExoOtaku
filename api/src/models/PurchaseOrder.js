const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "PurchaseOrder",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cart_ammount: {
        type: DataTypes.REAL,
      },

      delivery_ammount: {
        type: DataTypes.INTEGER,
      },

      total_ammount: {
        type: DataTypes.REAL,
      },

      shipping_address: {
        type: DataTypes.STRING,
      },

      billing_address: {
        type: DataTypes.STRING,
      },

      status: {
        type: DataTypes.STRING,
      },

      deleted: {
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
