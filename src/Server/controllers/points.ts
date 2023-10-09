export {}

require('dotenv').config()
const con = require('../config/using.ts')
const db = require('../db')

module.exports = {
  // 포인트 데이터 저장
  savePointControl: async (req, res) => {
    const clientID = req.body.clientID
    const points = req.body.points
    const event = req.body.event
    const description = req.body.description

    const sqlInsert = `INSERT INTO point_history (clientID, points, event, description) VALUES ( ?, ?, ?, ?)`
    const sqlSelect = `SELECT SUM(points) FROM point_history WHERE clientID = ?` // client가 가지고 있는 포인트의 총합 조회

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
    const clientId = req.params.clientId// 사용자 ID
//3개월
    let sql = `SELECT * FROM point_history WHERE clientID = ? AND created_at>=DATE_SUB(NOW(), INTERVAL 3 MONTH) `
    sql += ` ORDER BY created_at DESC` // 최신순으로 정렬

    try {


      await using getdb = await con()
      const [rows, fields] = await getdb.connection.execute(sql,[clientId])
  
console.log(rows)

      if (rows.length < 0) {
return res.status(400).send('nothing')
      }

      return res.status(200).send(rows)

    } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' }) // 예외 처리 시 JSON 형태의 오류 응답 전송
    }
  },
}
