const express = require("express");
const Router = express.Router();

const { usersController } = require("../controllers");

Router.post("/sign-up", usersController.signUp);
Router.post("/sign-in", usersController.signIn);

module.exports = Router;
