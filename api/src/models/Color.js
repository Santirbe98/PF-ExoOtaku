const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("color", {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true

    },

    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  }, {
    timestamps: false,
  }
);
};
