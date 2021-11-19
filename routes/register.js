const express = require('express');
const router = express.Router();
const session = require('express-session');
// const connection = require('../app.js');
// router.use('/',connection);

const mysql = require('mysql');
const connection = mysql.createConnection(
  {host:'localhost',
  user:'root',
  password:'tezukamasato1370',
  database:'my_db'
  });

router.get('/', (req,res,next) => {
  res.render('register.ejs');
  next()
});


router.post('/', (req,res,next) => {
  const firstName =  req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;
  const password = req.body.password;
  console.log(firstName);
  console.log(lastName);
  //空入力の判定
  console.log("データ受け取り完了");
  connection.query(
    'INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)',
    [firstName, lastName, email, password],
    (err,results) => {
      if(err)  throw err;
      console.log(results);
      req.session.id = results.insertId;
      req.session.email = results.email;
      req.session.password = results.password;
    }
  );
  res.render('listpage.ejs');
})

module.exports = router;
