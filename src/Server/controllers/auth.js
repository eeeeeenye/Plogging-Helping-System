require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')

module.exports = {
  // 회원 관리 코드
  // 회원 로그인 -> 회원정보를 DB에서 가져옴
  loginControl: async (req, res) => {
    try {
      // 클라이언트에서 전달받은 로그인 정보
      const { email, password } = req.body

      // MySQL에서 해당 유저 정보를 가져옴
      db.query(
        'SELECT clientID, email, clientName, phone, address FROM client WHERE email = ? AND pswd = ?',
        [email, password],
        (err, result) => {
          if (err) {
            console.error(err)
            res.status(500).json({ success: false, message: '서버 에러 발생' })
            return
          }

          if (result.length > 0) {
            const user = {
              clientID: result[0].clientID,
              email: result[0].email,
              ClientName: result[0].clientName,
              phone: result[0].phone,
              address: result[0].address,
            }
            res.send({ status: 'active', ...user })
          } else {
            res.send({
              success: false,
              message: '유저 정보가 일치하지 않습니다.',
            })
          }
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, message: '서버 에러 발생' })
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
    const Client_name = req.body.Client_name
    const Client_pwd = req.body.Client_pwd
    const Client_email = req.body.Client_email
    const Client_phone = req.body.Client_phone

    try {
      await db.query(
        `INSERT INTO plogging.CLIENT (EMAIL,clientName,pswd,PHONE) VALUES ( ?, ?, ?, ?)`,
        [Client_email, Client_name, Client_pwd, Client_phone],
        async (err) => {
          if (err) {
            console.log(err)
            throw err // 오류 발생 시 트랜잭션 롤백을 위해 예외 throw
          } else {
            console.log('Insert values successfully!')

            // INSERT 작업이 성공한 경우 SELECT 작업 수행
            await db.query(
              `SELECT clientID FROM plogging.client WHERE clientName = ?`,
              [Client_name],
              (err, result) => {
                if (err) {
                  console.log(err)
                  throw err // 오류 발생 시 트랜잭션 롤백을 위해 예외 throw
                } else {
                  console.log(result)
                  res.send(result)
                }
              }
            )
          }
        }
      )
    } catch (err) {
      console.error('Transaction failed. Rolling back.', err)
      res.status(500).send('Transaction failed. Rolling back.')
    }
  },
}
