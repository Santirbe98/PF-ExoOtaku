const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("size", {
    size: {
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
