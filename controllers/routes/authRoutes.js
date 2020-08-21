const User = require("../../models/users/User");
const { addUser } = require("../../models/users/userService");
const express = require("express");
const router = express.Router();

// show user registration page
router.get("/register", (req, res) => {
  return res.render("register", { message: null });
});

// post register data to database
app.post("/register", async (req, res) => {

  try {
    const user = await addUser(req.body);
    return res.render("register", { message: "Registration was successful" });

  } catch (error) {
    if(err){
      console.log(err);
      res.render("/register",{message: "Error Validation"})
    }
  });         
}

// show login page
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
