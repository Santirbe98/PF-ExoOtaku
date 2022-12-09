const { Router } = require("express");
const router = Router();
const { createNewProduct } = require("./Controllers/productsController");

router.post("/", async (req, res) => {
  try {
    const products = req.body;
    for (var i = 0; i < products.length; i++) {
      await createNewProduct(products[i]);
    }
    res.status(201).send(`se agregaron ${i} elementos`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
