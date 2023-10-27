export {}

require('dotenv').config()
const con = require('../config/using.ts')
const db = require('../db')

module.exports = {


  savePicture   :async(req,res) =>{

  

    const postID = req.body.postID
      const img_path= req.body.img_path
      const img_name = req.body.img_name
   
      const sql = `INSERT INTO PICTURES (img_name,img_path,postID) VALUES(?,?,?); `
    //   const sql2 =`SELECT  ,TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS minute FROM posting;`

      
      await using getdb = await con()


      try{

        const [rows, fields] = await getdb.connection.execute(sql,[postID,img_name,img_path])

      }catch(err){
        return res.status(500).send(err)
      }
  

  }
  ,
  infoPicture : async(req,res) =>{


  }
}