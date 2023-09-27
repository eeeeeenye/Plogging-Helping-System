require('dotenv').config()
const express = require('express')
const logger = require('morgan') // moran API 로그 남기기
const app = express()
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const axios = require('axios')

const authRouter = require('./routes/auth.js')
const pointsRouter = require('./routes/points.js')
const communityRouter = require('./routes/community.js')
const recordRouter = require('./routes/record.js')
const storeRouter = require('./routes/store.js')
const mapRouter = require('./routes/map.js')
const userRouter = require('./routes/user.js')

const db = require('./db') // db.js 파일 임포트
dotenv.config({ path: path.resolve(__dirname, '../../config.env') })

/*포트설정*/
app.set('port', process.env.PORT || 3000)

/*공통 미들웨어 */
app.use(logger('dev'))
app.use(express.json())
app.use(cors())

db.connect((error) => {
  console.log('db가 연결됐습니다.')
  if (error) {
    console.log(error)
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

/*서버와 포트와 연결*/
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중...')
})
console.log('여기도착')
/*오류 미들웨어 설정*/
app.use(function (err, req, res) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
