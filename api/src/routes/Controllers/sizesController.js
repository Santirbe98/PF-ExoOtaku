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
    let size = await Size.findByPk(id);
    if (size.deleted === true) {
      return "This Product doesnt exist";
    } else {
      await Size.update(
        {
          deleted: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return "Size deleted succesfully";
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllSizes,
  createNewSize,
  deleteSize,
};
