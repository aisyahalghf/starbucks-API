const express = require("express");
const Router = express.Router();

const { transactionController } = require("../controllers");

Router.post("/", transactionController.payment);

module.exports = Router;
