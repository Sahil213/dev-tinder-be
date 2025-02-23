const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: "String", minLength: 3 },
    lastName: { type: "String" },
    email: {
      type: "String",
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: "String",
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not Strong");
        }
      },
    },
    age: { type: "Number", min: 18 },
    gender: {
      type: "String",
      validate(value) {
        if (!["male", "female", "oters"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: "String",
      default: "https://www.gravatar.com/avatar/",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("URL is not valid");
        }
      },
    },
    about: {
      type: "String",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id },"DEV@TINDER790");
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  console.log("passwordInputByUser", passwordInputByUser);
  const user = this;
  console.log(user,"---- user")
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
