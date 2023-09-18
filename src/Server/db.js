const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../../config.env') })

console.log(process.env.host)

const db = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  port: process.env.port,
  password: process.env.password,
  database: process.env.database,
})

module.exports = db
