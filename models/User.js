const mongoose = require("mongoose");

// create user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [64, `Can't be longer than 64 characters`],
      minlength: [2, `Minimum of 2 letters, please!`],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// create collection name
const User = mongoose.model("users", userSchema);

module.exports = User;
