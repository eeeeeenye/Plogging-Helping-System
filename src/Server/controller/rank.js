require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')

module.exports = {



    
// 랭킹 관련 코드
// 각 기간의 랭킹에 맞는 회원 정보 가져오기
clientRankingControl:async (req, res) => {
    try {
      const oneWeekAgo = new Date()
      var dataList = []
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7) // 7일 전 DATE를 가져와서 업데이트
  
      const SELECT =
        `SELECT c.clientID,` +
        `c.clientName,` +
        `c.address, ` +
        `t.totalWalking,` +
        `t.totalDistance,` +
        `t.totalTrashCount,` +
        `t.totalRank ` +
        `FROM plogging.client AS c ` +
        `JOIN(` +
        `SELECT r.clientID,` +
        `SUM(r.walking) AS totalWalking,` +
        `SUM(r.distance) AS totalDistance,` +
        `SUM(r.trash_cnt) AS totalTrashCount,` +
        `RANK() OVER (ORDER BY SUM(r.walking)+SUM(r.distance)+SUM(r.trash_cnt) DESC) AS totalRank ` +
        `FROM plogging.record AS r ` +
        `WHERE r.record_time >= ? ` +
        `GROUP BY r.clientID ` +
        `LIMIT 10` +
        `) AS t ON c.clientID = t.clientID;`
  
      // 클라이언트 데이터 종합 데이터베이스 상에서 랭킹을 매겨 가져옴
      await db.query(SELECT, [oneWeekAgo], function (error, result) {
        for (var data of result) {
          dataList.push(data)
        }
        res.send(dataList)
      })
    } catch (error) {
      console.error('Error while aggregating client data:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  


}









}
