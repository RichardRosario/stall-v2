require("dotenv").config();
require("./controllers/utils/db.config");
require("./controllers/utils/authStategies/localStrategy");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const MongoStore = require("connect-mongo")(session);
const mongoDBConnection = require("./controllers/utils/db.config");
const authRoutes = require("./controllers/routes/authRoutes");
const passport = require("passport");
const categoryRoutes = require("./controllers/routes/categoryRoutes");
const categoryApiRoutes = require("./controllers/routes/api/categoryApiRoutes");
const authMiddleware = require("./controllers/middlewares/authMiddleware");
const config = require("./controllers/utils/config");
const { trimAndSantizeObject } = require("./controllers/utils/globalHelper");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "pug");
// app.set('trust proxy', 1)
// express-session
app.use(
  session({
    secret: "pambukasko2",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoDBConnection }),
  })
);
app.use(express.static("public"));
app.use(logger("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  trimAndSantizeObject(req.body);
  return next();
});

/**
 * Global middleware to make logged in user available to the views
 */
app.use((req, res, next) => {
  res.locals.assetUrl = config.assetUrl;
  res.locals.user = req.isAuthenticated() ? req.user : null;
  return next();
});

/**
 * App level locals
 */
app.locals.title = "Stall V2";
app.locals.message = {}; // Used in displaying alert
app.locals.formData = {}; // For prefilling data on form validation
app.locals.errors = {}; // Form validation errors

app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/controllers/routes/api/v1/category", categoryApiRoutes);

app.get("/", (req, res) => {
  return res.render("pages/homepage");
});

app.get("/dashboard", authMiddleware, (req, res) => {
  return res.render("dashboard/dashboard");
});

app.use((req, res, next) => {
  res.status(404).render("pages/404");
});

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`);
});

module.exports = app;
