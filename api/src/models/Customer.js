const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("customer", {

      id_customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      billing_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },


      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false
      }
    }
  );
};
