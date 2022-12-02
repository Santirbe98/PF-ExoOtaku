const { Router } = require("express");
// Importar todos los routers;
const productsRouter = require("./products.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/products", productsRouter);

module.exports = router;
