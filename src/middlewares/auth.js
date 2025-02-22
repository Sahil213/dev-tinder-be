const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  console.log("Admin Auth Middleware");
  try {
    const { token } = req.cookies;
    const decodedObj = await jwt.verify(token, "DEV@TINDER790");
    console.log(decodedObj);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      throw new Error("User not found")
    }
    req.user = user;
    if (decodedObj._id) {
      next(); // This will call the next function in the middleware chain
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { userAuth };
