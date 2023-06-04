const express = require('express')
const logger = require('morgan')                       // moran API 로그 남기기
const mysql = require('mysql')
const app = express()
const cors = require('cors')
const path = require("path")
const dotenv = require('dotenv')
const multer = require('multer')
const {spawn} = require('child_process')
const db = require("./db"); // db.js 파일 임포트
dotenv.config({path: path.resolve(__dirname,"../../config.env")});

/*포트설정*/
app.set('port',5000);                // process.env 객체에 기본 포트번호가 있다면 해당 포트를 사용한다는 것이고 없다면 8080 포트번호를 사용하겠다.
                                     // app.set(키,값) 함수는 키,값 파라미터를 이용하여 키에 값을 설정하도록 설정할 수 있는 함수
    
/*공통 미들웨어 */
app.use(express.static(__dirname+'/public'))
app.use(logger('dev'))                                                       
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

db.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL server: ' + error.stack);
      return;
    }
})

// 회원정보 CRUD
/* Create */
app.post("/clients", async(req,res)=>{
    const Client_name = req.body.Client_name;
    const Client_pwd = req.body.Client_pwd;
    const Client_email =req.body.Client_email;
    const Client_phone =req.body.Client_phone;

    db.query(`INSERT INTO plogging.CLIENT (EMAIL,clientName,pswd,PHONE) VALUES ( ?, ?, ?, ?)`,
    [ Client_email, Client_name, Client_pwd ,Client_phone],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Insert values successfully!");
        }
    })
})

// URI 전달하여 객체 감지 및 결과값 출력
app.post('/detection', async(req, res) => {
  console.log(req.body)
    try{
    // YOLO 실행 커맨드와 인자 설정
        const yoloCommand = 'python';
        const yoloScriptPath = '../detect/trashmodel4.py';
        const photoURI = req.body.photoURI;
        const yoloArgs = [yoloScriptPath, photoURI];

    // YOLO 스크립트(외부 프로세스) 실행
        const yoloProcess = spawn(yoloCommand, yoloArgs);
        console.log(yoloProcess)
      
        yoloProcess.stdout.on('data',(data)=>{
          con
            for(var data of result){
              dataList.push(data)
            }

            res.json(detectionResults);
        })
    }
    catch(error){
        console.error("YOLO 실행 중 오류 발생 : ",error)
        res.status(500).json({ error: 'YOLO 실행 중 오류 발생'});
    }
    
  });

// 기록물 DB 저장코드
app.post("/Record", async(req,res)=>{
    const Client_id = req.body.Client_id;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const walking = req.body.walking;
    const distance = req.body.distance;
    const stopwatch = req.body.stopwatch;
    const image = req.body.imageURI;
    const record_result = req.body.result

    db.query(
        `INSERT INTO Plogging.record VALUES ( ?, ?, ?, ?, ?, ?,?)`,
    [Client_id , latitude, longitude,walking, distance, stopwatch, image, record_result],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Insert values successfully!");
        }
    })
})

/* read */
app.post("/plogging/client", (req,res)=>{
    const email = req.body.Client_email;
    const name =req.body.Client_name;

    console.log(email,name)
    db.query(
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

// 각 기간의 랭킹에 맞는 회원 정보 가져오기
app.post("/plogging/ranking", async (req, res) => {
    try {
      // const oneWeekAgo = new Date();
      // oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      // console.log(oneWeekAgo)
      const oneWeekAgo = '2023-06-05 02:13:50'
  
      const SELECT =
        `SELECT c.clientID,` +
        `c.clientName,` +
        `t.totalWalking,` +
        `t.totalDistance,` +
        `t.totalTrashCount,` +
        `t.walkingRank ` +
        `FROM plogging.client AS c ` +
        `JOIN(` +
        `SELECT r.clientID,` +
        `SUM(r.walking) AS totalWalking,` +
        `SUM(r.distance) AS totalDistance,` +
        `SUM(r.trash_cnt) AS totalTrashCount,` +
        `RANK() OVER (ORDER BY SUM(r.walking) DESC) AS walkingRank ` +
        `FROM plogging.record AS r ` +
        `WHERE r.record_time >= ? ` +
        `GROUP BY r.clientID ` +
        `LIMIT 10` +
        `) AS t ON c.clientID = t.clientID;`
        var dataList = [];
      // 클라이언트 데이터 종합 데이터베이스 상에서 랭킹을 매겨 가져옴
     await db.query(SELECT, [oneWeekAgo],
        function(error,result){
            
            for (var data of result){
                dataList.push(data)
            }
            console.log(dataList)
        })
        
      res.send(dataList);
    } catch (error) {
      console.error('Error while aggregating client data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

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
  

  

/* Update */
app.put("/plogging/:params", (req, res)=>{
    const city = req.body.city;
    const clientName = req.body.ClientName;

    db.query(
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


/*서버와 포트와 연결*/

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),"번 포트에서 서버 실행 중...")
});

/*오류 미들웨어 설정*/
// app.use(function (err,req,res){
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });
