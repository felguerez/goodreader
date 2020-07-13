require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { query } = require("./lib/db");
const { logout } = require("./handlers/logout");
const { index } = require("./handlers");
const { createUser } = require("./handlers/createUser");
const { login } = require("./handlers/login");
const { loginRequired } = require("./auth/loginRequired");
const { getUser } = require("./handlers/getUser");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "burrito",
    resave: true,
    saveUninitialized: true,
    path: "/",
    domain: "localhost",
    sameSite: "lax",
    secure: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await query(`
        select * from "user" where "user".id=${id}
      `);
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const [user] = await query(
        `SELECT * from "user" where "user".email='${email}';`
      );
      if (!user) return done(null, false);

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          return done(err);
        }
        if (isValid) {
          return done(null, user);
        }
        return done(null, false);
      });
    }
  )
);

app.get("/", index);

app.post("/v1/users/create", createUser);

app.post("/v1/users/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ user: req.user });
});

app.get("/logout", logout);

app.get("/v1/user", getUser);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
