export{}
require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const con = require('../config/using.ts')

module.exports = {


saveBoardControl:async(req,res) =>{




    try {


      await using getdb = await con
      const [rows, fields] = await getdb.connection.execute(sql)
  
      if (rows.length < 0) {
return res.status(400).send('nothing')
      }

      return res.status(201).send(rows)

    }
catch(err){
    return res.status(500).send(err)
}
},
BoardInfo:async(req,res) =>{

const sql = `SELECT * from board`


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

},


}
