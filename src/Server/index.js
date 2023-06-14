const express = require('express')
const logger = require('morgan')                       // moran API 로그 남기기
const app = express()
const cors = require('cors')
const path = require("path")
const dotenv = require('dotenv')
//const randomstring = require('randomstring');
//const bcrypt = require('bcrypt');
const db = require("./db"); // db.js 파일 임포트
dotenv.config({path: path.resolve(__dirname,"../../config.env")});

const axios = require('axios');

/*포트설정*/
app.set('port',process.env.PORT || 3000);                                  
                                                                         
/*공통 미들웨어 */
app.use(logger('dev'))                                                       
app.use(express.json())
app.use(cors());

db.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL server: ' + error.stack);
      return;
    }
})

// 공공데이터 부분 관련 코드 // 충청남도 화장실 다뜨게 천안시 아산시 그리고 내위치 뜨도록 최종 수정 필요
// 화장실 정보 api end point
app.get('/publicToilets', async (req, res) => {
  try {
    const serviceKey = process.env.openRestAPI;
    const toiletUrl = 'http://api.data.go.kr/openapi/tn_pubr_public_toilet_api';
    const queryParams = [
      'serviceKey=' + serviceKey,
      'pageNo=1',
      'numOfRows=100',
      'type=json',
    ].join('&');
    
    const url = toiletUrl + '?' + queryParams;
    const response = await axios.get(url);
    const Data = response.data.response.body.items;

    const refinedData = Data.map((item) => {
      return {
        rdnmadr: item.rdnmadr,
        lnmadr: item.lnmadr,
        latitude: item.latitude,
        longitude: item.longitude,
      };
    });

    res.json(refinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 기록물 관리
// 기록물 DB 저장코드 // network Error 오류 개선
app.post("/Record", async(req,res)=>{
    const Client_id = req.body.clientID;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const walking = req.body.walking;
    const distance = req.body.distance;
    const stopwatch = req.body.stopwatch;
    const image = req.body.imageURI;
    const record_result = req.body.result;

    db.query(
        `INSERT INTO Plogging.record (clientID, latitude, longitude, walking, distance, stopwatch, image, trash_cnt)`
        +` VALUES ( ?, ?, ?, ?, ?, ?,?,?)`,
        [Client_id , latitude, longitude,walking, distance, stopwatch, image, record_result],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Record : Insert values successfully!");
        }
    })
})

// 기록물 조회코드 (최신순)
app.post("/Record/:clientID", async (req, res) => {
  try {
    const clientID = req.params.clientID;

    db.query(
      `SELECT * FROM Plogging.record WHERE clientID = ? ORDER BY record_time DESC`,
      [clientID],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    console.error("Error while retrieving client data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// 포인트 데이터 저장
app.post('/point',async(req,res)=>{
    const clientID = req.body.clientID;
    const points = req.body.points;
    const event = req.body.event;
    const descript = req.body.discript;
    const sqlInsert = `INSERT INTO Plogging.point_history (clientID, points, event, description) VALUES ( ?, ?, ?, ?)`
    const sqlSelect = `SELECT SUM(points) FROM Plogging.point_history WHERE clientID = ?`   // client가 가지고 있는 포인트의 총합 조회

    try{
      // Insert문 시행
      await db.query(
        sqlInsert,
        [clientID,points,event,descript],
        (err, result)=>{
          if(err){
              console.log(err);
          }else{
              //select문 시행 -> Insert문에 오류가 없을때 가져옴 (오류가 있으면 이전값 유지)
              db.query(
                sqlSelect,
                [clientID],
                (err, result)=>{
                  if(err){
                    console.log(err);
                  }else{ 
                    res.send(result)
                    console.log(result) }})
          }
      })

    }catch(error){console.error('points Inserting is fail : ',error)}

})


// 포인트 데이터 데이터 조회 // 수정완료
app.post('/point-history/:clientId', async (req, res) => {
  const clientId = req.params.clientId; // 사용자 ID

  let query = `SELECT * FROM point_history WHERE clientID = ${clientId}`;
      query += ` ORDER BY created_at DESC`; // 최신순으로 정렬

    try {
      await db.query(query,(err, results) => {
        if (err) {
          console.error('Error retrieving point history:', err);
          res.status(500).json({ error: 'Internal Server Error' }); // 오류 발생 시 JSON 형태의 오류 응답 전송
          return;
        }
      
        const dataList = results.map(data => ({
          clientID: data.clientID,
          points: data.points,
          event: data.event,
          description: data.description,
          created_at: data.created_at
        }));
      
        res.json(dataList);
      });
    } catch (error) {
      console.error('Error retrieving point history:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // 예외 처리 시 JSON 형태의 오류 응답 전송
    }
});



// 랭킹 관련 코드
// 각 기간의 랭킹에 맞는 회원 정보 가져오기
app.post("/plogging/ranking", async (req, res) => {
    try {
      const oneWeekAgo = new Date();
      var dataList = [];
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)    // 7일 전 DATE를 가져와서 업데이트
  
      const SELECT =
        `SELECT c.clientID,` +
        `c.clientName,` +
        `c.address, `+
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
      await db.query(SELECT, [oneWeekAgo],
        function(error,result){
            
            for (var data of result){
                dataList.push(data)
            }
            res.send(dataList);
        })
    } catch (error) {
      console.error('Error while aggregating client data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

// 회원 관리 코드
// 회원 로그인 -> 회원정보를 DB에서 가져옴
app.post('/api/login', (req, res) => {
    try {
      // 클라이언트에서 전달받은 로그인 정보
      const { email, password } = req.body;
  
      // MySQL에서 해당 유저 정보를 가져옴
      db.query(
        'SELECT clientID, email, clientName, phone, address FROM client WHERE email = ? AND pswd = ?',
        [email, password],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: '서버 에러 발생' });
            return;
          }
  
          if (result.length > 0) {
            const user = {
              clientID: result[0].clientID,
              email: result[0].email,
              ClientName: result[0].clientName,
              phone: result[0].phone,
              address: result[0].address,
            };
            res.send({ status: 'active', ...user });
          } else {
            res.send({ success: false, message: '유저 정보가 일치하지 않습니다.' });
          }
        }
      );
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: '서버 에러 발생' });
    }
});

// 비밀번호 재설정 API 엔드포인트 // 프론트엔드에서 사용하지 않음 -> 추후 추가 예정
app.post('/api/reset-password', async(req, res) => {
  const email = req.body.email; // 사용자 이메일
  const phone = req.body.phone; // 사용자 번호
  const query = `SELECT clientID FROM plogging.client WHERE email = ${email} AND phone = ${phone}`
  
  // 이메일 + 번호 사용자 확인
  await db.query(query, (err,results)=>{
    if(results.length > 0 ){
      // 임시 비밀번호 생성
      const tempPassword = randomstring.generate(8);

      // 임시 비밀번호 해싱
      bcrypt.hash(tempPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        // 데이터베이스에 임시 비밀번호 저장
        const query = `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`;

        db.query(query, (err, results) => {
          if (err) {
            console.error('Error resetting password:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          if (results.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
          } else {
            // 임시 비밀번호 이메일로 전송 (여기서는 생략)
            res.json({ message: 'Password reset successful', tempPassword:tempPassword });
          }
        });
      });
    }else{
      res.send({message: 'Not Founded your account!'})
      res.status(500).json({ error: 'Not Founded any account.' });
    }
   })

});

// 회원정보 관리
// 회원가입 관련 코드   //테스트 해봐야 함
app.post("/clients", async (req, res) => {
  const Client_name = req.body.Client_name;
  const Client_pwd = req.body.Client_pwd;
  const Client_email = req.body.Client_email;
  const Client_phone = req.body.Client_phone;

  try {

    await db.query(
      `INSERT INTO plogging.CLIENT (EMAIL,clientName,pswd,PHONE) VALUES ( ?, ?, ?, ?)`,
      [Client_email, Client_name, Client_pwd, Client_phone],
      async (err, result) => {
        if (err) {
          console.log(err);
          throw err; // 오류 발생 시 트랜잭션 롤백을 위해 예외 throw
        } else {
          console.log("Insert values successfully!");

          // INSERT 작업이 성공한 경우 SELECT 작업 수행
          await db.query(
            `SELECT clientID FROM plogging.client WHERE clientName = ?`,
            [Client_name],
            (err, result) => {
              if (err) {
                console.log(err);
                throw err; // 오류 발생 시 트랜잭션 롤백을 위해 예외 throw
              } else {
                console.log(result);
                res.send(result);
              }
            }
          );
        }
      }
    );

  } catch (err) {
    console.error("Transaction failed. Rolling back.", err);
    res.status(500).send("Transaction failed. Rolling back.");
  }
});

// 회원 주소 변경
app.put("/plogging/:params", async(req, res)=>{
    const city = req.body.city;
    const clientName = req.body.ClientName;

    await db.query(
        `UPDATE plogging.client SET address = ? WHERE clientName = ?;`,
        [city,clientName],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send('Updated values successfully!');
            }
        }
    )
});

// 사용자 조회
app.post("/plogging/client", async(req,res)=>{
  const email = req.body.Client_email;
  const name =req.body.Client_name;

  console.log(email,name)
  await db.query(
      `SELECT EMAIL,clientName,clientID FROM plogging.client WHERE email = ? OR clientName = ?;`,
      [email,name],
      (err, result) => {
          if(err){
              console.log(err);
          }else{
              res.send(result);
          }
      }
  )
});

/*서버와 포트와 연결*/
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),"번 포트에서 서버 실행 중...")
});

/*오류 미들웨어 설정*/
app.use(function (err,req,res){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



