const { Router } = require("express");
const axios = require("axios");
const { Product } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let result = await Product.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send("Products not found");
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let result = await Product.findByPk(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

router.post("/", async (req, res, next) => {
  const { name, price, descriptions, images, stock, date_added } = req.body;
  try {
    let newProduct = await Product.create({
      name: name.toString(),
      price: Number(price),
      descriptions: descriptions.toString(),
      images: images.toString(),
      stock: Number(stock),
      date_added: date_added,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal server error");
  }
});

// router.put("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     let result = await Product.findByPk(Number(id));
//     return res.status(200).json(result);
//   } catch (error) {
//     console.error({ error: error });
//     return res.status(404).send("Product not found");
//   }
// });

module.exports = router;
