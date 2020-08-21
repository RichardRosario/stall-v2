const express = require("express");
require("./utils/db.config");
const bodyParser = require("body-parser");
const authRoutes = require("./controllers/routes/authRoutes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", authRoutes);

app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});

module.exports = app;
