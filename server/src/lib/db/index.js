const { connect } = require("./connect");

const connection = connect();

async function query(string) {
  try {
    const results = await connection.query(string);
    return results.rows;
  } catch (error) {
    return { error };
  }
}

module.exports = { query };
