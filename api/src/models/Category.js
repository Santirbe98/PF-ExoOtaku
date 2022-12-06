const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "category",
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false
      }
    },
    {
      timestamps: false,
    }
  );
};
