const passport = require("passport");
const { query } = require("../lib/db");
const { createLocalStrategy } = require("./passport-local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser whats my user here", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("id to deserialize:", id);
    try {
      const user = await query(`
        select * from "user" where "user".id=${id}
      `);
      console.log("user  deserializing:", user);
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  });
  createLocalStrategy();
};
