const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  res.status(200).send("welcome to our api");
});

const { usersRouter, productsRouter, transactionRouter } = require("./router");
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/payment", transactionRouter);

app.listen(PORT, () => console.log("Api running in port" + PORT));
