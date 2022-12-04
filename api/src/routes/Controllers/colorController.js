const { Color } = require("../../db");

const getAllColors = async () => {
  try {
    const result = await Color.findAll({
      where: {
        deleted: false,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getOneColor = async (id) => {
  try {
    const result = await Color.findOne({
      where: {
        id: id,
        deleted: false,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createNewColors = async (color) => {
  try {
    const newColor = await Color.findOrCreate({
      where: {
        color: color,
      },
    });
    return newColor;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewColors,
  getAllColors,
  getOneColor,
};
