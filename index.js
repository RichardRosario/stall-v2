const express = require("express");

const app = express();
app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(5060, () => {
  console.log("Server started at port 5060");
});
