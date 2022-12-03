const { Size } = require("../../db");

const getAllSizes = async () => {
  try {
    const size = await Size.findAll({
      where: {
        deleted: false,
      },
    });
    return size;
  } catch (error) {
    console.log(error);
  }
};


const createNewSize = async (size) => {
  try {
    const newSize = await Size.findOrCreate({
      where: {
        size: size,
      },
    });
    return newSize;
  } catch (error) {
    console.log(error);
  }
};

const deleteSize = async (id) => {
    try {
      let deletesize = await Size.destroy({
        where: { id },
      });

    } catch (error) {
      console.log(error)
    }
}


module.exports = {
  getAllSizes,
  createNewSize,
  deleteSize,
};
