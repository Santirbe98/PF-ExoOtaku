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

const deleteType = async (id) => {
  try {
    const deleteType = await Type.findByPk(id);
    if (Type.deleted === true) {
      return `This type doesn't exist`;
    } else {
      await Type.update(
        {
          deleted: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return "Type deleted succesfully";
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  getAllTypes,
  createNewType,
  deleteType,
};
