require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const passport = require("passport");
const session = require("express-session");

const config = require("./config");
const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: "burrito", resave: true, saveUninitialized: true }));
app.use(passport.initialize({}));
app.use(passport.session({}));

const { Pool } = require("pg");

const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});
pgClient.on("error", () => console.log("Lost Postgress connection"));

pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS items (
    id uuid,
  item_name TEXT NOT NULL,
  complete BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
)`
  )
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("こんにちは!");
});

app.get("/test", (req, res) => {
  res.send("working");
});

app.get("/v1/items", async (req, res) => {
  const items = await pgClient.query("SELECT * FROM items");
  res.send(JSON.stringify(items.rows));
});

app.get("/signup", (req, res) => {});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
