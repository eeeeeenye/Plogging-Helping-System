const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../../config.env') })

const db = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    })
    console.log('db가 연결됐습니다.')
    return connection
  } catch (err) {
    console.error('Error connecting to MySQL server: ' + err.stack)
    throw err
  }
}

module.exports = db
