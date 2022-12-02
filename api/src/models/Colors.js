const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('colors', {
    color_id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    delete_l: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    }      
  });
};
//SUGERENCIA !
//se puedde agregar otro campo con el valor hex o rgb del color para usarlo de referencia