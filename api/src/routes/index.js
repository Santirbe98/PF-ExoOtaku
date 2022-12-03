const { Router } = require("express");
// Importar todos los routers;
const productsRouter = require("./products.js");
const colorRouter = require("./color.js");
const typesRouter = require("./types.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/products", productsRouter);
router.use("/color", colorRouter);
router.use("/types", typesRouter);
module.exports = router;
