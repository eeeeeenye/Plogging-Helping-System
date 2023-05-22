const express = require('express')
const logger = require('morgan')                       // moran API 로그 남기기
const mysql = require('mysql')
const app = express()
const cors = require('cors')
const path = require("path")
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname,"../../config.env")});

/*포트설정*/
app.set('port',3000);                // process.env 객체에 기본 포트번호가 있다면 해당 포트를 사용한다는 것이고 없다면 8080 포트번호를 사용하겠다.
                                     // app.set(키,값) 함수는 키,값 파라미터를 이용하여 키에 값을 설정하도록 설정할 수 있는 함수
          
/*공통 미들웨어 */
app.use(express.static(__dirname+'/public'))
app.use(logger('dev'))                                                       
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:process.env.user,
    password: process.env.password,
    database:"Plogging",
});

db.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL server: ' + error.stack);
      return;
    }
})

// 회원정보 CRUD
/* Create */
app.post("/create",(req,res)=>{
    const Client_name = req.body.Client_name;
    const Client_pwd = req.body.Client_pwd;
    const Client_email =req.body.Client_email;
    const Client_phone =req.body.Client_phone;

    db.query(`INSERT INTO Plogging.CLIENT (EMAIL,clientName,pswd,PHONE) VALUES ( ?, ?, ?, ?)`,
    [ Client_email, Client_name, Client_pwd ,Client_phone],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Insert values successfully!");
        }
    })
})

//기록물 DB 저장코드
app.post("/writeRecord",(req,res)=>{
    const Client_id = req.body.Client_id;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const walking = req.body.walking;
    const distance = req.body.distance;
    const stopwatch = req.body.stopwatch;
    const image = req.body.imageURI;
    const record_time = req.body.time;
    const record_result = req.body.result

    db.query(`INSERT INTO Plogging.record VALUES ( ?, ?, ?, ?, ?, ?,?)`,
    [ , Client_pwd, Client_email,Client_phone],
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

    db.query(
        `SELECT EMAIL,clientName FROM plogging.client WHERE email = ? OR clientName = ?;`,
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

app.post("/plogging/record", (req,res)=>{
    const email = req.body.Client_email;
    const name =req.body.Client_name;

    db.query(
        `SELECT EMAIL,CNAME FROM plogging.client WHERE EMAIL = ? OR CNAME = ?;`,
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

app.post('/api/login', (req, res) => {
    try {
      // 클라이언트에서 전달받은 로그인 정보
      const { email, password } = req.body;

      // MySQL에서 해당 유저 정보를 가져옴
      db.query(
        'SELECT clientID,email,clientName,phone,address FROM client WHERE email = ? AND pswd = ?', 
        [email, password], 
        (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, message: '서버 에러 발생' });
          return;
        }
      
        if (result.length > 0) {
          res.send({ success: true , ...result[0]});
        } else {
          res.send({ success: false, message: '유저 정보가 일치하지 않습니다.' });
        }
      });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: '서버 에러 발생' });
    }
  });

  

/* Update */
app.put("/plogging/:params", (req, res)=>{
    const city = req.body.city;
    const clientID = req.body.Client_ID;
    console.log(city)

    db.query(
        `UPDATE plogging.client SET address = ? WHERE clientID = ?;`,
        [city,clientID],
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
