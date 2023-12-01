const User = require("../model/usermodel.js");
const handleError = require("../utills/error.js");
const bcryptjs = require("bcryptjs");
const test = (req, res) => {
  res.send("users server");
};

const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(handleError(401, "unauthorized user"));
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      },
    },
    { new: true }
  );
  const { password, ...rest } = updatedUser._doc;
  res.status(203).json(rest);
};
module.exports = { test, updateUser };
