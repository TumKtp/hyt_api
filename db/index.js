const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
pool.on("error", (err) => {
  console.error("An idle client has experienced an error", err.stack);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
