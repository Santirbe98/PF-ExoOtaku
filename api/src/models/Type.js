const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
