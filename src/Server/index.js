require('dotenv').config()
const express = require('express')
const logger = require('morgan') // moran API 로그 남기기
const app = express()
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const axios = require('axios')

const authRouter = require('./routes/auth')
const pointsRouter = require('./routes/points')
const communityRouter = require('./routes/community')
const recordRouter = require('./routes/record')
const storeRouter = require('./routes/store')
const mapRouter = require('./routes/map')
const userRouter = require('./routes/user')

const db = require('./db') // db.js 파일 임포트
dotenv.config({ path: path.resolve(__dirname, '../../config.env') })

/*포트설정*/
app.set('port', process.env.PORT || 3000)

/*공통 미들웨어 */
app.use(logger('dev'))
app.use(express.json())
app.use(cors())

db.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL server: ' + error.stack)
    return
  }
})

app.get('/', (req, res) => {
  res.status(200).send('hello world....!!')
})

app.use('/auth', authRouter)
app.use('/community', communityRouter)
app.use('/mpa', mapRouter)
app.use('/points', pointsRouter)
app.use('/record', recordRouter)
app.use('/store', storeRouter)
app.use('/user', userRouter)

// 랭킹 관련 코드
// 각 기간의 랭킹에 맞는 회원 정보 가져오기
app.post('/plogging/ranking', async (req, res) => {
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
})

/*서버와 포트와 연결*/
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중...')
})

/*오류 미들웨어 설정*/
app.use(function (err, req, res) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
