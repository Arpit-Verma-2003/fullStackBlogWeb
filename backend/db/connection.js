const pg = require('pg');
const { Client } = pg;
require("dotenv").config();
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'blogapp',
  })

async function name() {
    await client.connect()
}
name();
module.exports = client;