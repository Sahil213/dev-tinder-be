const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt the password
    const passworHash = await bcrypt.hash(password, 10);
    // Craete a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      password: passworHash,
    });

    await user.save();
    res.send("User Created");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      // Create  A Jwt TOKEN
      const token = await user.getJWT();
      // Add the JWT token to the response header
      res.cookie("token", token);
      res.send("Logged in");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("Logged out");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = authRouter;
