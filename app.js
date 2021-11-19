const express = require('express');
const mysql = require('mysql');
const app = express();

app.use('/public',express.static('public'));
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection(
  {host:'localhost',
  user:'me',
  password:'tezukamasato1370',
  database:'users'
  });

// https://expressjs.com/ja/4x/api.html#express.urlencoded


app.use('/', require('./routes/index'));
app.use('/login',require('./routes/login'));
app.use('/newregister',require('./routes/register'));
app.use('/list-top',require('./routes/listtop'));

// app.post('/newregister', (req,res,next) => {
//   res.render('login.ejs');
// })


module.exports = connection;

app.listen(8000);

