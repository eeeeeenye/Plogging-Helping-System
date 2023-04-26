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
    user:"root",
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
    const Client_id = req.body.Client_id;
    const Client_name = req.body.Client_name;
    const Client_pwd = req.body.Client_pwd;
    const Client_email =req.body.Client_email;

    console.log(req)
    console.log(Client_id+Client_name+Client_pwd+Client_email)

    db.query(`INSERT INTO Plogging.CLIENT (CID,CNAME,PASSWORD,EMAIL,PHONE,CBIRTH) VALUES (?, ?, ?, ?, ?, ?)`,
    [Client_id, Client_name, Client_pwd, Client_email],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Insert values successfully!");
        }
    })
})

/* read */
app.get("/ploggings", (req, res)=>{
    db.query("SELECT * FROM Plogging.CLIENT", (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(`Selected values successfully!`)
        }
    })
})

/* Update */
app.put("/plogging", (req, res)=>{
    const todoid = req.body.todoid;
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;
    const priority = req.body.priority;

    db.query(
        "UPDATE TODOLISTSYSTEM TODOS SET AUTHOR = ?, TITLE = ?, CONTENT = ?, PRIORITY = ? WHERE TODOID = ?;",
        [author, title, content, priority, todoid],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send('Updated values successfully!');
            }
        }
    )
});

/* Delete */
app.delete("/todos/:todoid", (req,res)=>{
    const {todoid} = req.params;
    db.query(
        "DELETE FROM TODOLISTSYSTEM.TODOS WHERE TODOID = ?",
        [todoid],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(`Delete value succeddfully!`);
            }
        }
    )
});

// 게시글 CRUD


/*서버와 포트와 연결*/

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),"번 포트에서 서버 실행 중...")
});

/*오류 미들웨어 설정*/
// app.use(function (err,req,res){
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

