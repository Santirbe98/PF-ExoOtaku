const { Router } = require("express");
const router = Router();

// const data = require('../data')
const {
  getAllProducts,
  createNewProduct,
  getProductDetail,
  modifyProd,
  deleteProd,
} = require("./Controllers/productsController");

router.get("/", async (req, res) => {
  const name = req.query.name;
  try {
    let listProducts;
    let productListres = await getAllProducts();

    if (name) {
      listProducts = productListres.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      name.length
        ? res.status(200).send(listProducts)
        : res.status(404).send("This product doesn't exist");
    } else {
      res.status(200).send(productListres);
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Products not found");
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    price,
    descriptions,
    images,
    stock,
    color,
    size,
    type,
    category,
  } = req.body;
  if (
    !name ||
    !price ||
    !descriptions ||
    !images ||
    !stock ||
    !color ||
    !size ||
    !type ||
    !category
  ) {
    res.status(400).send("Complete all required fields");
  }
  try {
    const newProduct = await createNewProduct(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let productDetail = await getProductDetail(id);
    res.status(200).send(productDetail);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, descriptions, images, stock } = req.body;
  try {
    await modifyProd({ id, name, price, descriptions, images, stock });
    res.status(200).send("Product modified successfully");
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteProd(id);
    res.status(200).send(response);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send(error.message);
  }
});

module.exports = router;
