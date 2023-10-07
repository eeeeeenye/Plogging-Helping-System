export {}

require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const con = require('../config/using.ts')

module.exports = {
  // 회원 관리 코드
  // 회원 로그인 -> 회원정보를 DB에서 가져옴

  loginControl: async (req, res) => {
    const { email, password } = req.body
    const sql =
      'SELECT clientID,email,clientName,address,phone  FROM client WHERE email = ? AND pswd = ?'
    await using getdb = await con()


    try {
      // 클라이언트에서 전달받은 로그인 정보

      // MySQL에서 해당 유저 정보를 가져옴

      const [rows, fields] = await getdb.connection.execute(sql, [email, password])

      console.log(rows, fields)

      //로그인 실패
      // if (rows.length === 0) {
      //   return res.status(405).send('login failure')
      // }
      //로그인 성공
      return res.status(200).send(rows[0])
    } catch (err) {
      return res.status(500).send(err)
    }
  },

  // 비밀번호 재설정 API 엔드포인트 // 프론트엔드에서 사용하지 않음 -> 추후 추가 예정
  resetPasswordControl: async (req, res) => {
    const email = req.body.email // 사용자 이메일
    const phone = req.body.phone // 사용자 번호
    const query = `SELECT clientID FROM plogging.client WHERE email = ${email} AND phone = ${phone}`

    // 이메일 + 번호 사용자 확인
    await db.query(query, (err, results) => {
      if (results.length > 0) {
        // 임시 비밀번호 생성
        const tempPassword = randomstring.generate(8)

        // 임시 비밀번호 해싱
        bcrypt.hash(tempPassword, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err)
            res.status(500).json({ error: 'Internal Server Error' })
            return
          }

          // 데이터베이스에 임시 비밀번호 저장
          const query = `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`

          db.query(query, (err, results) => {
            if (err) {
              console.error('Error resetting password:', err)
              res.status(500).json({ error: 'Internal Server Error' })
              return
            }

            if (results.affectedRows === 0) {
              res.status(404).json({ error: 'User not found' })
            } else {
              // 임시 비밀번호 이메일로 전송 (여기서는 생략)
              res.json({
                message: 'Password reset successful',
                tempPassword: tempPassword,
              })
            }
          })
        })
      } else {
        res.send({ message: 'Not Founded your account!' })
        res.status(500).json({ error: 'Not Founded any account.' })
      }
    })
  },

  // 회원정보 관리
  // 회원가입 관련 코드   //테스트 해봐야 함
  clientControl: async (req, res) => {
    const name = req.body.name
    const pwd = req.body.pwd
    const email = req.body.email
    const phone = req.body.phone
    await using getdb = await con()


    try {
      //회원가입 여부확인
      const [rows, fields] = await getdb.query(
        `SELECT * FROM client WHERE email = ?`,
        [email]
      )
      //회원가입이 이미돼있는경우
      if (rows.length > 0) {
        return res.status(401).send('이미 가입된 아이디')
        //회원가입이 되지 않았다면 회원가입
      } else if (rows.length === 0) {
        const [insertUser, fields] = await  getdb.query(
          `INSERT INTO CLIENT (EMAIL,clientName,pswd,PHONE) VALUES ( ?, ?, ?, ?)`,
          [email, name, pwd, phone]
        )
        console.log(!insertUser)

        if (!insertUser) {
          //생성이 안된경우
          return res.status(400).send(' insert Failure')
        }

        // 생성이 되는경우
        return res.status(201).send('create login user')
      }
    } catch (err) {
      console.error('Transaction failed. Rolling back.', err)
      return res.status(500).send('Transaction failed. Rolling back.')
    }
  },

  logoutControl: async(req,res)=>{

    await using getdb = await con()
    const sql =``

    return res.status(200).send('logout success')

  }
}
