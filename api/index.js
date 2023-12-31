const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const signUpRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const url = process.env.MONGO_URI;
// connnection
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e));

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", userRouter); //user api
app.use("/api", signUpRouter); //signup api
// app.use("/api");
// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";
  return res.status(statusCode).json({ success: false, message, statusCode });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
