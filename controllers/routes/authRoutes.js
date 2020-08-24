const User = require("../../models/users/User");
const { addUser } = require("../../models/users/userService");
const express = require("express");
const router = express.Router();
const { registerSchemaValidate } = require("../validation/registerValidation");
const { errorFormater, mongooseFormater } = require("../utils/errorFormater");

// show user registration page
router.get("/register", (req, res) => {
  return res.render("register", { message: null });
});

// post register data to database
router.post("/register", async (req, res) => {
  try {
    const validationResult = registerSchemaValidate.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.send(errorFormater(validationResult.error));
      return res.render("register", {
        message: "Registration validate failed!",
      });
    }
    const user = await addUser(req.body);
    return res.render("register", { message: "Registration was successful" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.send(mongooseFormater(err));
      return res
        .status(400)
        .render("/register", { message: "Error Validation" });
    }
  }
});

// show login page
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
