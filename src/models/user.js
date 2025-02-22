const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: "String", minLength: 3 },
    lastname: { type: "String" },
    email: {
      type: "String",
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: "String", required: true },
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

module.exports = mongoose.model("User", userSchema);
