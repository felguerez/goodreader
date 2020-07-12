const { Pool } = require("pg");
const config = require("./config");
const fs = require("fs");
const sql = fs.readFileSync(__dirname + "/tables.sql").toString();

function connect() {
  const connection = new Pool({
    user: config.pgUser,
    host: config.pgHost,
    database: config.pgDatabase,
    password: config.pgPassword,
    port: config.pgPort,
  });
  connection.on("error", () => console.log("Lost Postgres connection"));
  connection.query(sql);
  return connection;
}

module.exports = { connect };
