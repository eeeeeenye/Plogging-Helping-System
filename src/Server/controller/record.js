require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')

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

    db.query(
      `INSERT INTO Plogging.record (clientID, latitude, longitude, walking, distance, stopwatch, image, trash_cnt)` +
        ` VALUES ( ?, ?, ?, ?, ?, ?,?,?)`,
      [
        Client_id,
        latitude,
        longitude,
        walking,
        distance,
        stopwatch,
        image,
        record_result,
      ],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send('Record : Insert values successfully!')
        }
      }
    )
  },

  // 기록물 조회코드 (최신순)
  recordInfoControl: async (req, res) => {
    try {
      const clientID = req.params.clientID

      db.query(
        `SELECT * FROM Plogging.record WHERE clientID = ? ORDER BY record_time DESC`,
        [clientID],
        (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
          } else {
            res.json(result)
          }
        }
      )
    } catch (error) {
      console.error('Error while retrieving client data:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}
