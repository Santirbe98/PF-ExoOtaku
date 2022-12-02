const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('products', {
    product_id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
    },
    images: {
      type:DataTypes.STRING,
    },
    categories: {
      type:DataTypes.STRING,
    },
    sizes: {
      type:DataTypes.STRING,
    },
    colors: {
      type:DataTypes.STRING,
    },  
    types: {
      type:DataTypes.STRING,
    } ,
    delete_l: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    }            
  });
};
