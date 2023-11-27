const authController = (req, res) => {
  console.log(req.body);
  res.send("signup");
};
module.exports = authController;
