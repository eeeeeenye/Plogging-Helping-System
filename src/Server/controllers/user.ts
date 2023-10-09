export {}
require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const con = require('../config/using.ts')
module.exports = {
  // 회원 주소, 닉네임, 재설정
  userEditControl: async (req, res) => {
    const city = req.body.city
    const email = req.body.email
    const clientName = req.body.clientName
    await using getdb = await con()
    const sql =  `UPDATE client SET address = ? clientName = ? WHERE email = ?;`

    try {
  
        const [rows, fields] = await getdb.connection.execute(sql,      [city,clientName,email])

    

  
 
     return     res.status(200).send('Updated values successfully!')
        
      }catch(err){

        console.log(err)
      }
    
  },
  // 사용자 조회
  userInfoControl: async (req, res) => {
    const email = req.body.Client_email
    const name = req.body.Client_name

    console.log(email, name)
    await db.query(
      `SELECT EMAIL,clientName,clientID FROM plogging.client WHERE email = ? OR clientName = ?;`,
      [email, name],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      }
    )
  },

  user:async (req,res)=>{

    const sql = `SELECT * from client`
    await using getdb = await con()

    const [rows,fields] =await getdb.connection.execute(sql)


return res.status(200).send(rows)

  }
}
