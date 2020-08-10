const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/stall2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});
