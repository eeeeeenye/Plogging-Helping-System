export{}
require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const con = require('../config/using.ts')

module.exports = {


saveBoardControl:async(req,res) =>{


    let sql = `SELECT * FROM point_history WHERE clientID = ? AND created_at>=DATE_SUB(NOW(), INTERVAL 3 MONTH) `
    sql += ` ORDER BY created_at DESC` // 최신순으로 정렬

    try {


      await using getdb = await con
      const [rows, fields] = await getdb.connection.execute(sql)
  
      if (rows.length < 0) {
return res.status(400).send('nothing')
      }

      return res.status(200).send(rows)

    }
catch(err){
    return res.status(500).send(err)
}
}

}
