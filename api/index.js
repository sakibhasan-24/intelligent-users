const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.port || 3000;

const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
