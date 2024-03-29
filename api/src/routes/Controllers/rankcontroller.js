const axios = require("axios");
const { RankProduct, Product } = require("../../db");
const { Op } = require("sequelize");

module.exports = {
  getRankByCustomer: async function (customer_id) {
    const Rank_ByCustomer = await RankProduct.findAll({
      attributes: ["id", "product_id", "comment", "rank", "createdAt"],
      where: {
        [Op.and]: [{ customer_id: customer_id }, { deleted: false }],
      },
    });
    return Rank_ByCustomer;
  },

  getRankByProduct: async function () {
    const Rank_ByProduct = await RankProduct.findAll({
      //attributes: ["product_id", [sequelize.fn("count", sequelize.col("product_id")), "cnt"]],
      //group: ["product_id"],
      where: {
        deleted: false,
      },
    });
    return Rank_ByProduct;
  },

  createNewRank: async function (customer_id, product_id, rank, comment) {
    const new_Rank = await RankProduct.create({
      customer_id: customer_id,
      product_id: product_id,
      rank: rank,
      comment: comment,
      deleted: false,
    });
    const selprod = await Product.findByPk(product_id, {});
    selprod.addRankProduct(new_Rank);
    return new_Rank;
  },

  ModifyRank: async function (id, rank, comment) {
    const updtRank = await RankProduct.findByPk(id, {});
    await updtRank.update({
      rank,
      comment,
    });
    return "The Information was successfully Updated";
  },

  DeleteRank: async function (id) {
    await RankProduct.update(
      { deleted: true },
      {
        where: {
          id: id,
        },
      }
    );
    return "The Information was successfully Deleted";
  },
};
