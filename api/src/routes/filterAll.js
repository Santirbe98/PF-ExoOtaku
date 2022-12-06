const { Router } = require("express");
const axios = require("axios");
const {
  filtradoSize,
  filtradoColor,
  getAllColor,
} = require("./Controllers/filterAllController");
const { getAllSizes } = require("./Controllers/sizesController");
const { getAllProducts } = require("./Controllers/productsController");
const router = Router();

router.get("/search", async (req, res) => {
  let sizeToSearch = req.query.size;
  let allSizes = await getAllSizes();
  let allColor = await getAllColor();
  let allProducts = await getAllProducts();
  try {
    let search = await filtradoSize(sizeToSearch, allProducts);

    res.status(200).send(search);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
