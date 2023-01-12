const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "RankProduct", 
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      comment:{
        type: DataTypes.STRING,
        allowNull: false,
      },

      rank: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true,
    }    
  );
};
