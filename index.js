const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});

module.exports = app;
