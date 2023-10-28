export{}
require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const con = require('../config/using.ts')

module.exports = {


saveCommunityControl:async(req,res) =>{

  

  const clientID = req.body.ClientID
    const title = req.body.title
    const Region_Name = req.body.Region_Name
    const date = req.body.date
    const content = req.body.content
    const member_num =  req.body.member_num
    const time = req.body.time
    const img_name =req.body.img_name
    const img_path = req.body.img_path

const sql = "INSERT INTO POSTING (ClientID,title,content,member_num,Region_Name,time) VALUES(?,?,?,?,?,?,?)"
// const idFindSql = "SELECT clientID from Client WHERE email VALUES (?)"
await using getdb = await con()
    try {
      // const [client,fields] =  await getdb.connection.execute(idFindSql,[email])


      const [rows, fields] = await getdb.connection.execute(sql,[clientID,title,Region_Name,content,member_num,time])
  
      if (rows.length < 0) {
return res.status(400).send('nothing')
      }


      return res.status(201).send(rows)

    }
catch(err){
    return res.status(500).send(err)
}
},
communityInfo:async (req,res) =>{

const sql = `SELECT * ,TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS minute FROM posting ORDER BY created_at DESC;`

await using getdb = await con()
try {



  const [rows, fields] = await getdb.connection.execute(sql)
//날짜 계산 필요 client에서 createdAt를 가져와서 계산하기
//분으로 계산해서 가져오기
// 분으로 계산된걸 => 시 일 월 년 으로 
//분 시 일 년 으로 나타내려면 가져와서 client에서 처리하는게 효율적으로 보임
  console.log(rows)
 
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
