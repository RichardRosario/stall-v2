const express = require("express");
const helmet = require("helmet");
const https = require("https");

const app = express();
app.use(helmet()); //for helmet as middlewaht to force https

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(5060, () => {
  console.log("Server started at port 5060");
});

https.createServer(app).listen(5070);
