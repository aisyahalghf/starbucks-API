const express = require("express");
const Router = express.Router();

const { productsController } = require("../controllers");

Router.get("/", productsController.getAllProducts);

module.exports = Router;
