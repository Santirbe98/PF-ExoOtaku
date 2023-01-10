const Router = require("express");
const router = Router();

const {
  PurchaseOrder,
  ShoppingCart,
  ShoppingList,
  Customer,
  Payment,
  Product,
  Category,
  Color,
  Image,
} = require("../../db");

const getAllOrders = async () => {
  try {
    let ordersByUser = await PurchaseOrder.findAll({
      where: {
        deleted: false,
      },
      include: [
        {
          model: Payment,
          required: true,
        },

        {
          model: Customer,
        },

        {
          model: ShoppingCart,
          include: [
            {
              model: ShoppingList,
              include: [
                {
                  model: Product,
                  include: [
                    {
                      model: Category,
                    },

                    {
                      model: Color,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    let orders = ordersByUser.map((item) => {
      return {
        order_id: item.order_id,
        user: item.customer.dataValues.name,
        email: item.customer.dataValues.email,
        status: item.status,
        order: item.PaymentId,
        date: item.createdAt,
        articles: item.ShoppingCart.ShoppingLists.length,
        cost: item.cart_ammount,
        delivery: item.delivery_ammount,
        total: item.total_ammount,
        products: item.ShoppingCart.ShoppingLists.map((it) => {
          return {
            id: it.product.id,
            cantidad: it.quantity,
            talla: it.size,
            producto: it.product.name,
            precio: it.price,
            categoria: it.product.categories[0].category,
            color: it.product.colors[0].color,
            imagen: it.product.imagesForm,
          };
        }),
      };
    });

    return orders;
  } catch (error) {
    console.log(error);
  }
};

const getOrderDetail = async (id) => {
  try {
    let order = await PurchaseOrder.findByPk(id, {
      attributes: [
        "order_id",
        "cart_ammount",
        "delivery_ammount",
        "total_ammount",
        "status",
        "PaymentId",
        "deleted",
      ],
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email"],
        },

        {
          model: ShoppingCart,
          attributes: ["id", "ammount", "createdAt"],
          include: [
            {
              model: ShoppingList,
              attributes: ["id", "price", "quantity", "size", "productId"],
            },
          ],
        },
      ],
    });
    if (!order || order.dataValues.deleted === true) {
      return "Order not found";
    }
    return order;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusOrder = async (id, status) => {
  try {
    let orderToUpdate = await PurchaseOrder.findByPk(id);
    if (orderToUpdate.dataValues.deleted === true || !orderToUpdate) {
      return "Order not found";
    } else {
      await PurchaseOrder.update(
        {
          status: status,
        },
        {
          where: {
            order_id: id,
          },
        }
      );
      let orderUpdated = await PurchaseOrder.findByPk(id, {
        attributes: [
          "order_id",
          "cart_ammount",
          "delivery_ammount",
          "total_ammount",
          "status",
          "PaymentId",
          "deleted",
        ],
        include: [
          {
            model: ShoppingCart,
            attributes: ["id", "ammount", "createdAt"],
            include: [
              {
                model: ShoppingList,
                attributes: ["id", "price", "quantity", "size", "productId"],
              },
            ],
          },
        ],
      });

      return orderUpdated;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOrder = async (id) => {
  try {
    let result = await PurchaseOrder.findByPk(id);
    if (!result || result.dataValues.deleted === true) {
      return "Order not found";
    } else {
      await PurchaseOrder.update(
        {
          deleted: true,
        },
        {
          where: {
            order_id: id,
          },
        }
      );
      return "Order deleted succesfully";
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getOrdersByUser = async (userId) => {
  try {
    let ordersByUser = await PurchaseOrder.findAll({
      where: {
        customerId: userId,
      },

      include: [
        {
          model: Payment,
          required: true,
        },

        {
          model: ShoppingCart,
          include: [
            {
              model: ShoppingList,
              include: [
                {
                  model: Product,
                  include: [
                    {
                      model: Category,
                    },

                    {
                      model: Color,
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
                },
              ],
            },
          ],
        },
      ],
    });

    let customerOrders = ordersByUser.map((item) => {
      return {
        order: item.PaymentId,
        date: item.createdAt,
        articles: item.ShoppingCart.ShoppingLists.length,
        cost: item.cart_ammount,
        delivery: item.delivery_ammount,
        total: item.total_ammount,
        products: item.ShoppingCart.ShoppingLists.map((it) => {
          return {
            id: it.product.id,
            cantidad: it.quantity,
            talla: it.size,
            producto: it.product.name,
            precio: it.price,
            categoria: it.product.categories[0].category,
            color: it.product.colors[0].color,
            imagen: it.dataValues.product.dataValues.images[0].url,
          };
        }),
      };
    });

    return customerOrders;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllOrders,
  getOrderDetail,
  deleteOrder,
  updateStatusOrder,
  getOrdersByUser,
};
