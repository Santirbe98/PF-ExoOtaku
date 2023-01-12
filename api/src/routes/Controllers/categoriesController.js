const axios = require("axios");
const { Category } = require("../../db");
const { Op } = require("sequelize");

module.exports = {
  getAllCategories: async function () {
    const categories_list = await Category.findAll({
      attributes: ["id", "category"],
    });
    return categories_list;
  },

  getCategoryDetail: async function (id) {
    const category_detail = await Category.findByPk(id, {
      attributes: ["id", "category"],
    });
    return category_detail;
  },

  createNewCategory: async function (category) {
    const new_category = await Category.create({
      category: category,
    });

    return new_category;
  },

  ModifyCategory: async function (id, category) {
    const updtcategory = await Category.findByPk(id, {});
    await updtcategory.update({ category });

    return "The Information was successfully Updated";
  },

  DeleteCategory: async function (id) {
    const dellcategory = await Category.findByPk(id, {});
    await dellcategory.update({ deleted: true });
    return "The Information was successfully Updated";
  },
};
