require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide your password" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide your email" });
    }
    const user = await UserModel.findOne({ email }, "-__v");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "You are not registered" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        if (!user.verified) {
          return res
            .status(401)
            .json({ success: false, message: "You are not verified" });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET,
          { expiresIn: "3h" }
        );

        return res.status(200).json({ success: true, message: token });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect credentials" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
}

module.exports = userLogin;
