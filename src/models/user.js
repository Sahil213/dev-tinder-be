const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: "String",
  lastname: "String",
  email: "String",
  password: "String",
  age: "Number",
  gender: "String",
});

module.exports = mongoose.model("User", userSchema);
