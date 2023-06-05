const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../config.env") });

const db = mysql.createConnection({
  host: "10.20.32.181",
  user: process.env.user,
  password: process.env.password,
  database: "Plogging",
});

module.exports = db;
