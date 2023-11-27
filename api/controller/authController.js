const User = require("../model/usermodel.js");

const authController = async (req, res) => {
  //   console.log(req.body);

  try {
    const { email, password, userName } = req.body;
    const user = new User({ email, password, userName });
    //   console.log(user);

    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
module.exports = authController;
