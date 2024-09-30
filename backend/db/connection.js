const pg = require('pg');
const { Client } = pg;
require("dotenv").config();
const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  })

async function name() {
    await client.connect();
    await client.query('SET search_path TO public');
}
name();
module.exports = client;