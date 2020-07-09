require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const config = require("./config");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.get("/test", (req, res) => {
  res.send("working");
});

app.get("/v1/items", async (req, res) => {
  const items = await pgClient.query("SELECT * FROM items");
});

app.get("/signup", (req, res) => {});
