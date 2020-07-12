const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { query } = require("../lib/db");

function createLocalStrategy() {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const [user] = await query(
          `SELECT * from "user" where "user".email='${email}';`
        );
        if (!user) return done(null, false);
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) return done(null, false);
        done(null, user);
      }
    )
  );
}

module.exports = { createLocalStrategy };
