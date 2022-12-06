const { Product, Category, Size, Color, Type } = require("../../db");

const filtradoSize = async (sizeToSearch, sizes) => {
  if(sizeToSearch ==='all'){
    return sizes
  }else 
  return sizes.filter((prod) => prod.size.includes(sizeToSearch));
};

const filtradoColor  = async (colorToSearch, colors) => {
  if(colorToSearch ==='all'){
    return colors
  }else 
  return colors.filter((prod) => prod.color.includes(colorToSearch));
};

const getAllColor= async () => {
  try {
    const color = await Color.findAll({
      where: {
        deleted: false,
      },
    });
    return color;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  filtradoSize,
  filtradoColor,
  getAllColor
}