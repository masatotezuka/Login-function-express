const express = require('express');
const mysql = require('mysql');
const app = express();
const session = require('express-session');
// const domain = require('express-domain-middleware');
// app.use(domain);


app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/public',express.static('public'));
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));
// https://expressjs.com/ja/4x/api.html#express.urlencoded

const connection = mysql.createConnection(
  {host:'localhost',
  user:'me',
  password:'tezukamasato1370',
  database:'users'
  });

//ルーティング
app.use('/', require('./routes/index'));
app.use('/login',require('./routes/login'));
app.use('/newregister',require('./routes/register'));
app.use('/list-top',require('./routes/listtop'));
app.use('/logout', require('./routes/logout'));
app.use('/requestpassword', require('./routes/requestPassword'));
app.use('/resetpassword', require('./routes/resetPassword'));

app.listen(8000);