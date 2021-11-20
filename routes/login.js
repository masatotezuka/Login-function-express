const express = require('express');
const router = express.Router();
// const session = require('express-session');

const mysql = require('mysql');
const connection = mysql.createConnection(
  {host:'localhost',
  user:'root',
  password:'tezukamasato1370',
  database:'my_db'
  });

router.get('/', (req,res,next) => {
  res.render('login.ejs',{errorUndefined:[],errorUnmatch:[]});
});


router.post('/',(req,res,next) =>{
  const email=req.body.email;
  const password=req.body.password;
  const errorMessage=[];
  console.log(`email:`,email,` password:`,password);
  console.log("POST処理完了");
  if(email===''){
    errorMessage[0]='メールアドレスが未入力です。';
  }
  if(password===''){
    errorMessage[1]='パスワードが未入力です。';
  }
  if(errorMessage.length>0){
    res.render('login.ejs',{errorUndefined:errorMessage,errorUnmatch:[]});
  }else{
    next()
  }
},
(req,res,next)=>{
  const email=req.body.email;
  const password=req.body.password;
  const errorMessage=[];
  connection.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email,password],
    (err,results)=>{
      if (err) throw err;
      console.log(results);
      if(results.length > 0){
        req.session.userId = results[0].id;
        // console.log(req.sessionID);
        console.log(req.session.userId);
        req.session.email = results[0].email;
        console.log(req.session.email);
        // req.session.password = results[0].password;
        res.redirect('/list-top');
      }else{
        errorMessage.push('ログイン情報が正しくありません。');
        res.render('login.ejs',{errorUndefined:[],errorUnmatch:errorMessage});
      }
    }
  );
}
);

// const car = "bentz";
// console.log(car);

module.exports = router;
// module.exports = car;