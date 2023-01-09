require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_URL } = process.env;

// const sequelize = new Sequelize(DB_URL, {
//   logging: false,
//   native: false,
// });

//*****Comentar la linea de abajo y descomentar la linea de arriba para MERGE con MAIN*****

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/exOtaku`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Product,
  Category,
  Color,
  Size,
  Type,
  Image,
  PurchaseOrder,
  Payment,
  ShoppingCart,
  ShoppingList,
  Customer,
  RankProduct,
  Address,
} = sequelize.models;

Product.belongsToMany(Category, {
  through: "Product_Categorys",
});
Category.belongsToMany(Product, {
  through: "Product_Categorys",
});

Product.belongsToMany(Color, {
  through: "Product_Colors",
});
Color.belongsToMany(Product, {
  through: "Product_Colors",
});

Product.belongsToMany(Size, {
  through: "Product_Sizes",
});
Size.belongsToMany(Product, {
  through: "Product_Sizes",
});

Product.belongsToMany(Type, {
  through: "Product_Types",
});
Type.belongsToMany(Product, {
  through: "Product_Types",
});

Color.hasMany(Image);
Image.belongsTo(Color);

Product.hasMany(Image);
Image.belongsTo(Product);

ShoppingCart.hasMany(ShoppingList);
ShoppingList.belongsTo(ShoppingCart);

Product.hasMany(ShoppingList);
ShoppingList.belongsTo(Product);

ShoppingCart.hasOne(PurchaseOrder);
PurchaseOrder.belongsTo(ShoppingCart);

Payment.hasOne(PurchaseOrder);
PurchaseOrder.belongsTo(Payment);

Customer.hasMany(PurchaseOrder);
PurchaseOrder.belongsTo(Customer);

Product.hasMany(RankProduct);
RankProduct.belongsTo(Product);

Address.hasOne(Customer);
Customer.belongsTo(Address);
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
