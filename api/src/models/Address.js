const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("address", {

      id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },        

      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      provincia: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      departamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      comuna: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
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
