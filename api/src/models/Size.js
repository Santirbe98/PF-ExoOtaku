const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("size", {
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
};
