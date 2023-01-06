const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },

      method: {
        type: DataTypes.STRING,
      },

      reference: {
        type: DataTypes.INTEGER,
      },

      delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
