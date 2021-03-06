const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../../models/users/User");

/**
 * Logins a user with email and password
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // find the user if it exist
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, {
            message: "That user not in our database",
          });
        // check if password matched
        if (await user.checkPassword(password)) return done(null, user);
        return done(null, false, { message: "Password is incorrect!" });
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findOne({ _id });
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});
