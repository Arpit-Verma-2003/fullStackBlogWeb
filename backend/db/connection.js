const pg = require('pg');
const { Client } = pg;

const client = new Client({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'blogapp',
  })

async function name() {
    await client.connect()
    // const res = await client.query('SELECT * from blogs')
    // console.log(res.rows[0]) // Hello world!
    // await client.end()
}
name();
module.exports = client;