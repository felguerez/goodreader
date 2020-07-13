const bcrypt = require("bcryptjs");
const { query } = require("../lib/db");
const passport = require("passport");
const { v4: uuid } = require("uuid");

async function createUser(req, res, next) {
  const password = await bcrypt.hash(req.body.password, 10);
  try {
    await query(`
        INSERT INTO "user" (id, email, password, created_at) 
        VALUES ('${uuid()}', '${req.body.email}','${password}', now());
        `);
    passport.authenticate("local")(req, res, next);
  } catch (e) {
    console.log("error:", e);
    res.status(500).end();
  }
}
module.exports = { createUser };
