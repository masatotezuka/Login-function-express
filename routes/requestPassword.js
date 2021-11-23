const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(
  {host:'localhost',
  user:'root',
  password:'tezukamasato1370',
  database:'my_db'
  });

router.get('/',(req,res,next)=>{
  res.render('request-password.ejs',{errorUndefined:[],errorUnmatch:[]});
});

router.post('/',(req,res,next)=>{
  const email=req.body.email;
  const errorMessage=[];
  console.log(email);
  if(email===''){
    errorMessage.push('メールアドレスが入力されていません。');
    console.log(errorMessage);
    res.render('request-password.ejs',{errorUndefined:errorMessage,errorUnmatch:[]});
  }else{
    next();
  }
},
(req,res,next)=>{
  const email=req.body.email;
  connection.query(
    'SELECT * FROM `users` WHERE `email` = ?',
    [email],
    (err,results)=>{
      console.log(results[0]);
      if (err) throw err;
      const errorMessage=[];
      if(results.length>0){
        res.render('after-post-mail.ejs');
        // res.redirect('/requestpassword');
        console.log(`入力アドレスは`,results[0].email);
        const email = req.body.email;
        console.log('メール準備');
        const send = require('gmail-send')({
          user: 'tez.0731.mst@gmail.com',
          pass: 'wevpot-6qetje-xodmeF',
          to:   email,
          subject: 'パスワードを設定してください',
        });
        send({
          text:`パスワードのリセットを承りました。
          下記ＵＲＬより、パスワードを再設定してください。
          http://localhost:8000/resetpassword/${email}`
              },(error,results)=>{
                if (error) console.error(error);
                console.log(results);
              });
              console.log('メール送信完了');
      }else{
        errorMessage.push('入力したアドレスは登録されておりません。');
        console.log(errorMessage);
        res.render('request-password.ejs',{errorUndefined:[],errorUnmatch:errorMessage});
      }
    }
  );
},
(req,res,next)=>{
  
}
);

module.exports = router;