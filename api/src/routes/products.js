const { Router } = require("express");
const axios = require("axios");
const { Products } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let result = await Products.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send("Products not found");
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (typeof id === "number") {
      let result = await Products.findByPk(id);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

// router.post("/", async (req, res, next) => {
//   const {} = req.body;
//   try {
//   } catch (error) {}
// });

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (typeof id === "number") {
      let result = await Products.findByPk(id);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

module.exports = router;
