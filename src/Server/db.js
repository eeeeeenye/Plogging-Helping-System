const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../config.env") });

const db = mysql.createConnection({
  host: "10.20.32.42",
  user: 'kdb',
  password: 'plogging',
  database: "Plogging",
});

module.exports = db;
