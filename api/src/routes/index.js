const { Router } = require("express");
// Importar todos los routers;
const productsRouter = require("./products.js");
const colorRouter = require("./color.js");
const categoriesRouter = require("./category.js");
const typesRouter = require("./types.js");
const sizesRouter = require("./size.js");
const filtersRouter = require("./filterAll.js");
const mockRouter = require("./mock.js");
const Payment = require("./payment.js");

const customerRouter = require("./customer.js");
const cloudinary = require("./cloudinary.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/payment", Payment);
router.use("/products", productsRouter);
router.use("/color", colorRouter);
router.use("/categories", categoriesRouter);
router.use("/types", typesRouter);
router.use("/sizes", sizesRouter);
router.use("/filters", filtersRouter);
router.use("/mock", mockRouter);
router.use("/customer", customerRouter);
router.use("/cloudinary", cloudinary);
module.exports = router;
