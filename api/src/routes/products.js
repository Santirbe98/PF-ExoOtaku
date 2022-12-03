const { Router } = require("express");
const router = Router();

// const data = require('../data')
const { getAllProducts, createNewProduct, getProductDetail, modifyProd, deleteProd } = require('./Controllers/productsController')


router.get("/", async (req, res) => {
  const { id } = req.query
  try {
    let listProducts
    let productListres = await getAllProducts()
    if (id) {
      listProducts = productListres.filter(el => el.product_id.includes(id))
      res.status(200).send(listProducts)
    }

    else {
      res.status(200).send(productListres)
    }
  } catch (error) {
    console.error({ error: error.message })
    res.status(500).send('Products not found')
  }
})

router.post('/', async (req, res) => {
  const { name, price, descriptions, images, stock, color } = req.body
  try {
    let newProduct = await createNewProduct({ name, price, descriptions, images, stock, color })
    res.status(201).send(newProduct)
  } catch (error) {
    console.error({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let productDetail = await getProductDetail(id)
    res.status(200).send(productDetail)
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {name, price, descriptions, images, stock} = req.body
  try {
    await modifyProd({id, name, price, descriptions, images, stock})
    res.status(200).send('Product modified successfully')
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Product not found");
  }
});

router.delete('/:id', async(req, res) =>  {
  const {id} = req.params
  try {
    let response = await deleteProd(id)
    res.status(200).send(response)
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send(error.message);
  }
})


module.exports = router;
