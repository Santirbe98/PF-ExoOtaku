const { Type } = require("../../db");

const getAllTypes = async () => {
  try {
    const products = await Type.findAll({
      where: {
        deleted: false,
      },
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

const createNewType = async (type) => {
  try {
    const newType = await Type.findOrCreate({
      where: {
        type: type,
      },
    });
    return newType;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTypes,
  createNewType,
};
