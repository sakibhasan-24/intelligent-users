const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel.js");
const handleError = require("../utills/error.js");

// signUp
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

// for login
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
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// google log in
const googleLogIn = async (req, res, next) => {
  // console.log("hitted");
  try {
    const user = await User.findOne({ email: req.body.email });
    // if user exist
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hasedPassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // if not exists
      // create prfile picture,name,password
      const generatedPassword = Math.random().toString().slice(-8);
      // console.log(generatedPassword);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        email: req.body.email,
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString().slice(-8),
        profilePicture: req.body.photo,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hasedPassword, ...rest } = newUser;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authController, loginAuth, googleLogIn };
