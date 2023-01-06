const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "image",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      url: {
        type: DataTypes.STRING,
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
