const { Router } = require('express');
// Importar todos los routers;
const productsRouter = require("./products.js");
const colorRouter = require("./color.js");
const categoriesRouter = require("./category.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/products", productsRouter);
router.use("/color", colorRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
