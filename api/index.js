const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const signUpRouter = require("./routes/authRoute");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e));
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", userRouter);
app.use("/api/signup", signUpRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
