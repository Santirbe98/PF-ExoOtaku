const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "address",
    {
      provincia: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      comuna: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      valorEntrega: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
