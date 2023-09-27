require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')

module.exports = {
  // 포인트 데이터 저장
  savePointControl: async (req, res) => {
    const clientID = req.body.clientID
    const points = req.body.points
    const event = req.body.event
    const description = req.body.description
    const sqlInsert = `INSERT INTO PlogSging.point_history (clientID, points, event, description) VALUES ( ?, ?, ?, ?)`
    const sqlSelect = `SELECT SUM(points) FROM Plogging.point_history WHERE clientID = ?` // client가 가지고 있는 포인트의 총합 조회

    try {
      // Insert문 시행
      await db.query(
        sqlInsert,
        [clientID, points, event, description],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            //select문 시행 -> Insert문에 오류가 없을때 가져옴 (오류가 있으면 이전값 유지)
            db.query(sqlSelect, [clientID], (err, result) => {
              if (err) {
                console.log(err)
              } else {
                res.send(result)
                console.log(result)
              }
            })
          }
        }
      )
    } catch (error) {
      console.error('points Inserting is fail : ', error)
    }
  },
  // 포인트 데이터 데이터 조회 // 수정완료
  pointHistoryControl: async (req, res) => {
    const clientId = req.params.clientId // 사용자 ID

    let query = `SELECT * FROM point_history WHERE clientID = ${clientId}`
    query += ` ORDER BY created_at DESC` // 최신순으로 정렬

    try {
      await db.query(query, (err, results) => {
        if (err) {
          console.error('Error retrieving point history:', err)
          res.status(500).json({ error: 'Internal Server Error' }) // 오류 발생 시 JSON 형태의 오류 응답 전송
          return
        }

        const dataList = results.map((data) => ({
          clientID: data.clientID,
          points: data.points,
          event: data.event,
          description: data.description,
          created_at: data.created_at,
        }))

        res.json(dataList)
      })
    } catch (error) {
      console.error('Error retrieving point history:', error)
      res.status(500).json({ error: 'Internal Server Error' }) // 예외 처리 시 JSON 형태의 오류 응답 전송
    }
  },
}
