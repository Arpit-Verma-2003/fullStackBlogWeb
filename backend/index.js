const express = require("express");
const cors = require("cors");
const { connection } = require("./db/sequalConnection");

const app = express();
const port = 3000;

// console.log(connection);
connection();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
