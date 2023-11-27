const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const url = process.env.MONGO_URI;
console.log(url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e));
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
