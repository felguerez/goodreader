require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const session = require("express-session");
const passport = require("passport");
const { logout } = require("./handlers/logout");
const { index } = require("./handlers");
const { createUser } = require("./handlers/createUser");
const { login } = require("./handlers/login");
const { loginRequired } = require("./auth/loginRequired");
const init = require("./auth/passport");
const { getUser } = require("./handlers/getUser");

init();

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
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", index);

app.post("/v1/users/create", createUser);

app.post("/v1/users/login", passport.authenticate("local"), login);

app.get("/logout", logout);

app.get("/v1/user", loginRequired, getUser);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
