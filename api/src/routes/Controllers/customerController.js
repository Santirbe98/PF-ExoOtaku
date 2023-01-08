const axios = require("axios");
const { Customer } = require("../../db");
const { Op } = require("sequelize");

module.exports = {
  getCustomerDetail: async function (email) {
    const Customer_detail = await Customer.findOne({
      attributes: [
        "id",
        "name",
        "token",
        "email",
        "country",
        "provincia",
        "phone",
        "comuna",
        "shipping_address",
        "billing_address",
        "isadmin",
        "deleted",
        "wishList",
      ],
      where: {
        email: email,
      },
    });
    return Customer_detail;
  },

  getAllCustomer: async function () {
    const Customer_list = await Customer.findAll({
      attributes: [
        "id",
        "name",
        "token",
        "email",
        "shipping_address",
        "billing_address",
        "phone",
        "isadmin",
        "deleted",
        "comuna",
        "provincia",
      ],
      where: {
        deleted: false,
      },
    });
    return Customer_list;
  },

  createNewCustomer: async function (
    name,
    phone,
    token,
    email,
    country,
    provincia,
    comuna,
    shipping_address,
    billing_address,
    isadmin
  ) {
    const new_Customer = await Customer.create({
      name: name,
      phone: phone,
      token: token,
      email: email,
      country: country,
      provincia: provincia,
      comuna: comuna,
      shipping_address: shipping_address,
      billing_address: billing_address,
      isadmin: isadmin,
      deleted: false,
    });
    /*     console.log(new_Customer); */
    return new_Customer;
  },

  ModifyCustomer: async function (
    id,
    name,
    token,
    email,
    country,
    provincia,
    phone,
    comuna,
    shipping_address,
    billing_address,
    isadmin
  ) {
    const updtCustomer = await Customer.findByPk(id, {});
    await updtCustomer.update({
      name,
      token,
      email,
      country,
      provincia,
      phone,
      comuna,
      shipping_address,
      billing_address,
      isadmin,
    });
    return "The Information was successfully Updated";
  },

  ModifyWishList: async function (id, wishList) {
    if (!id || !wishList) return "Information incomplete";
    const updtCustomer = await Customer.findByPk(id, {});
    let newWishList;
    if (!updtCustomer.wishList) {
      newWishList = [wishList];
    } else {
      newWishList = [...updtCustomer.wishList];
      if (!Array.from(newWishList).includes(wishList))
        newWishList.push(wishList);
    }
    await updtCustomer.update({ wishList: newWishList });
    return "The information was successfully updated";
  },

  DeleteCustomer: async function (id) {
    const dellCustomer = await Customer.findByPk(id, {});
    await dellCustomer.update({ deleted: true });
    return "The Information was successfully Deleted";
  },

  DeleteWishList: async function (id, productId) {
    if (!id || !productId) return "Information incomplete";
    const userWishListDeleted = await Customer.findByPk(id, {});
    const deletedWishList = [...userWishListDeleted.wishList];
    const newWishList = deletedWishList.filter((e) => e !== productId);
    await userWishListDeleted.update({ wishList: newWishList });
    return "The information was successfully updated";
  },
};
