const { Router } = require("express");
const express = require("express");
const router = Router();
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const {
  PurchaseOrder,
  Payment,
  ShoppingCart,
  Product,
  ShoppingList,
} = require("../db");

router.post("/create-checkout-session", async (req, res) => {
  let Ammount = 0;

  req.body.cartItems.forEach((item) => {
    Ammount += item.price * item.amount;
  });

  const userCart = await ShoppingCart.create({
    ammount: Ammount,
  });

  const cartId = userCart.dataValues.id;
  const customer = await stripe.customers.create({
    metadata: {
      cartId,
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      priceSent: req.body.priceSent,
    },
  });

  await ShoppingCart.update(
    {
      checkout: customer.id,
    },
    {
      where: {
        id: cartId,
      },
    }
  );

  req.body.cartItems.forEach(async (item) => {
    const Prod = await Product.findByPk(item.id);
    const List = await ShoppingList.create({
      price: item.price,
      quantity: item.amount,
      size: item.size,
    });
    await List.setProduct(Prod);
    await List.setShoppingCart(userCart);
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "ARS",
        product_data: {
          name: item.name,
          brand: item.brand,
          images: item.images,
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100 + item.price * 0.21 * 100,
      },
      quantity: item.amount,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: customer.metadata.priceSent * 100,
            currency: "ars",
          },
          display_name: "puede variar según la dirección proporcionada",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ],

    line_items: line_items,
    customer: customer.id,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/home`,
  });
  res.send({ url: session.url });
});

router.get("/checkout-success", async (req, res) => {
  const { session_id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  let newPayment = await Payment.create({
    id: session.payment_intent,
    method: session.payment_method_types[0],
    reference: session.created,
  });

  let newOrder = await PurchaseOrder.create({
    delivery_ammount: session.shipping_cost.amount_total / 100,
    cart_ammount: session.amount_subtotal / 100,
    total_ammount: session.amount_total / 100,
    status: session.payment_status,
  });

  await newOrder.setPayment(session.payment_intent);
  await newOrder.setShoppingCart(customer.metadata.cartId);

  let orderUser = await PurchaseOrder.findOne({
    where: {
      PaymentId: session.payment_intent,
    },
    include: [
      {
        model: ShoppingCart,
      },
    ],
  });

  await orderUser.setCustomer(customer.metadata.userId);

  let userCart = await ShoppingCart.findByPk(customer.metadata.cartId, {
    include: [
      {
        model: ShoppingList,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });
  let paymentUser = await Payment.findByPk(session.payment_intent);

  let userData = {
    name: customer.metadata.name,
    email: customer.metadata.email,
  };

  res.send({ orderUser, paymentUser, userCart, userData });
});

module.exports = router;
