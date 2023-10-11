export {}
require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')


require('dotenv').config()
const con = require('../config/using.ts')

module.exports = {
  // 기록물 관리
  // 기록물 DB 저장코드 // network Error 오류 개선
  saveRecordControl: async (req, res) => {
    const Client_id = req.body.clientID
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const walking = req.body.walking
    const distance = req.body.distance
    const stopwatch = req.body.stopwatch
    const image = req.body.imageURI
    const record_result = req.body.result

    const sql =      `INSERT INTO record (clientID, latitude, longitude, walking, distance, stopwatch, image, trash_cnt)` +
    ` VALUES ( ?, ?, ?, ?, ?, ?,?,?)`
    await using getdb = await con()
    try{
      const [rows, fields] = await getdb.connection.execute(sql,    [
        Client_id,
        latitude,
        longitude,
        walking,
        distance,
        stopwatch,
        image,
        record_result,
      ],)


  
      if(rows<0){
        return res.status(400).send('failed')
      }
    
         return  res.status(201).send('Record : Insert values successfully!')

      
    
  }catch(err){
    return res.status(500).send(err)
  }

  },

  // 기록물 조회코드 (최신순)
  recordInfoControl: async (req, res) => {
const sql = `SELECT * FROM record WHERE clientID = ? ORDER BY record_time DESC`
const clientID = req.params.clientID
console.log(clientID)
await using getdb = await con()

    try {
  
        const [rows, fields] = await getdb.connection.execute(sql,[ clientID ])
    
        if (rows.length < 0) {
  return res.status(400).send('nothing')
        }

        return res.status(200).send(rows)
    } catch (error) {
      console.error('Error while retrieving client data:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}
