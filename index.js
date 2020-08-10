const express = require("express");
require("./utils/db.config");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});
app.get("/login", (req, res) => {
  return res.render("login");
});
app.get("/register", (req, res) => {
  return res.render("register");
});

// post register data to database
app.post("/register", async (req, res) => {
  user = new User(req.body);
  await user.save();
  res.render("register", { message: "Registration was successful" });
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});

module.exports = app;
