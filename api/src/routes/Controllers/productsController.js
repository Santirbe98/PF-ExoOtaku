const { Product, Category, Size, Color, Type, Image } = require("../../db");
// const { Op } = require("sequelize");
require("dotenv").config();
const { cloudinary } = require("../Utils/CludinarySettings.js");

function compare_lname(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const getAllProducts = async function () {
  try {
    let products = await Product.findAll({
      include: [
        {
          model: Color,
          attributes: ["color"],
          through: {
            attributes: [],
          },
        },
        {
          model: Type,
          attributes: ["type"],
          through: {
            attributes: [],
          },
        },
        {
          model: Size,
          attributes: ["size"],
          through: {
            attributes: [],
          },
        },
        {
          model: Category,
          attributes: ["category"],
          through: {
            attributes: [],
          },
        },

        {
          model: Image,
          attributes: ["url"],
          include: {
            model: Color,
            attributes: ["color"],
          },
        },
      ],
    });
    if (products.length) {
      const dbData = await products.map((d) => {
        const colorArray = d.colors.map((t) => t.color);
        const typeArray = d.types.map((t) => t.type);
        const sizeArray = d.sizes.map((t) => t.size);
        const imageArray = d.images.map((t) => ({
          images: t.url,
          color: t.color.color,
        }));
        // const categoryArray = d.categorys.map((t) => t.category);
        field = d.dataValues;

        dataProduct = {
          id: field.id,
          name: field.name,
          price: field.price,
          description: field.descriptions,
          images: field.imagesForm,
          stock: field.stock,
          date_added: field.date_added,
          deleted: field.deleted,
          color: colorArray,
          type: typeArray,
          size: sizeArray,
          category: field.categories[0].category,
          imagesDb: imageArray,
        };
        return dataProduct;
      });
      return dbData.sort(compare_lname);
    }
  } catch (error) {
    console.log(error);
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getUrlCloud = async (imageBase64) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(imageBase64, {
      upload_preset: "ExoOtaku",
    });
    return uploadedResponse.url;
  } catch (error) {
    console.log(error);
  }
};

const createNewProduct = async ({
  name,
  price,
  descriptions,
  imagesForm,
  stock,
  color,
  size,
  type,
  category,
  imagesDb,
}) => {
  try {
    let urls = await Promise.all(imagesDb.map((i) => getUrlCloud(i.url)));
    let imagesAndColors = imagesDb.map((e, index) => ({
      url: urls[index],
      color: e.color,
    }));
    name = (name.charAt(0).toUpperCase() + name.slice(1)).trim();
    imagesForm = [imagesAndColors[getRandomInt(imagesAndColors.length)].url];
    let newProduct = await Product.create({
      name,
      price: parseInt(price),
      descriptions,
      imagesForm,
      stock: parseInt(stock),
    });

    color?.map(async (d) => {
      const colorName = await Color.findOrCreate({
        where: { color: d },
      });
      console.log(colorName);
      newProduct.addColors(colorName[0]);
    });

    imagesAndColors &&
      imagesAndColors.map(async (i) => {
        const colorDb = await Color.findOrCreate({
          where: { color: i.color },
        });
        let colorId = colorDb[0].dataValues.id;
        const algo = await colorDb[0].createImage({ url: i.url });
        newProduct.addImage([algo]);
        newProduct.addColors(colorId);
      });

    const typeName = await Type.findOrCreate({
      where: { type },
    });
    newProduct.addTypes(typeName[0]);
    size.map(async (t) => {
      let sizeName = await Size.findOrCreate({
        // attributes: ["id"],
        where: { size: t },
      });

      newProduct.addSizes(sizeName[0]);
    });
    const categoryName = await Category.findOrCreate({
      where: { category },
    });
    newProduct.addCategory(categoryName[0].dataValues.id);
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (id) => {
  try {
    let allProducts = await getAllProducts();
    let productRes = await allProducts.find((s) => s.id == id);

    if (!productRes) {
      return "This product doesn't exist";
    } else {
      return productRes;
    }
  } catch (error) {
    console.log(error);
  }
};

const modifyProd = async ({ id, name, price, descriptions, images, stock }) => {
  try {
    let ProductToUpdate = await Product.findByPk(id);

    if (!ProductToUpdate) {
      throw new Error("Product Not Found");
    } else {
      await Product.update(
        {
          name,
          price,
          descriptions,
          images,
          stock,
        },
        {
          where: {
            product_id: id,
          },
        }
      );
      let producMod = Product.findOne({
        where: {
          product_id: id,
        },
      });

      return producMod;
    }
  } catch (error) {
    console.error({ error: error });
  }
};

const deleteProd = async (id) => {
  try {
    let prod = await Product.findByPk(id);
    if (prod.deleted === true) {
      return "This Product doesnt exist";
    } else {
      await Product.update(
        {
          deleted: true,
        },
        {
          where: {
            product_id: id,
          },
        }
      );
      return "Product deleted succesfully";
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductDetail,
  modifyProd,
  deleteProd,
};
