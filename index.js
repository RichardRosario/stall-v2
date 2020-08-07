const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});

module.exports = app;
