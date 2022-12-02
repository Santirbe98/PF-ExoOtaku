const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("colors", {
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
};
