const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

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
      unique: true,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// hashing password using mongoose middleware and bcrypt
userSchema.pre("save", async function (next) {
  // check is password is modified
  if (!this.isModified("password")) next();
  // if modified hash the password
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// create collection name
const User = mongoose.model("users", userSchema);

module.exports = User;
