const { Router } = require("express");
// Importar todos los routers;
const productsRouter = require("./products.js");
const colorRouter = requiere("./color.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/products", productsRouter);
router.use("/color", colorRouter);

module.exports = router;
