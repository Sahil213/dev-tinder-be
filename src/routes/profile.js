const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid fields to edit");
    }
    const user = req.user;
    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });
    await user.save();
    res.json({
      message: `${user.firstName},your Profile Updated successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {  
  try {
    const { newPassword } = req.body;
    const user = req.user;
    console.log(user)
   
    user.password = newPassword;
    await user.save();
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
