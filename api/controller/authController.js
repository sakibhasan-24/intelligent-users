const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel.js");
const handleError = require("../utills/error.js");

const authController = async (req, res, next) => {
  //   console.log(req.body);

  try {
    const { email, password, userName } = req.body;
    const hasedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ email, password: hasedPassword, userName });
    //   console.log(user);

    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    // res.status(501).json({ message: error.message });
    next(error);
  }
};
const loginAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(handleError(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(handleError(404, "User not found"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hasedPassword, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ rest });
  } catch (error) {
    next(error);
  }
};

module.exports = { authController, loginAuth };
