export{}
require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const con = require('../config/using.ts')

module.exports = {


saveCommunityControl:async(req,res) =>{

  

  const clientID = req.body.clientID
    const title = req.body.title
    const city = req.body.city
    const date = req.body.date
    const description = req.body.description
    const people= req.body.people

const sql = "INSERT INTO COMMUNITY (clientID,title,city,description,people) VALUES(?,?,?,?,?)"

await using getdb = await con()
    try {


      const [rows, fields] = await getdb.connection.execute(sql,[clientID,title,city,description,people])
  
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

const sql = `SELECT * ,TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS minute FROM community ORDER BY created_at DESC;`

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
communitySelectInfo:async (req,res) => {


  const community_id = req.params.community_id
const sql = `SELECT * from posting where community_id = ?`

  await using getdb = await con()

  try {



    const [rows, fields] = await getdb.connection.execute(sql,[community_id])
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

}

}
