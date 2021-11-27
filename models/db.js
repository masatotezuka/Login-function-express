const mysql = require('mysql');
const connection = mysql.createConnection(
  {host:'localhost',
  user:'root',
  password:'tezukamasato1370',
  database:'my_db'
  });

  connection.connect(err=>{
    if(err){
      throw err;
    };
  });

  module.exports = connection;