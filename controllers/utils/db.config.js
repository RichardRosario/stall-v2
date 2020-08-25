const mongoose = require("mongoose");
const config = require("./config");

mongoose.set("debug", process.env.NODE_ENV !== "production");

mongoose.connect("mongodb://localhost:27017/stall2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose.connection;
