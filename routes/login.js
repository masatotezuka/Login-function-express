const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tezukamasato1370",
  database: "my_db",
});

router.get("/", (req, res, next) => {
  res.render("login.ejs", { errorUndefined: [], errorUnmatch: [] });
});

router.post(
  "/",
  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errorMessage = [];
    console.log(`email:`, email, ` password:`, password);
    console.log("POST処理完了");
    if (email === "") {
      errorMessage[0] = "メールアドレスが未入力です。";
    }
    if (password === "") {
      errorMessage[1] = "パスワードが未入力です。";
    }
    if (errorMessage.length > 0) {
      res.render("login.ejs", {
        errorUndefined: errorMessage,
        errorUnmatch: [],
      });
    } else {
      next();
    }
  },
  (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const errorMessage = [];
    console.log(email, password);
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        console.log(results);
        if (err) throw err;
        const hashPass = results[0].password;
        console.log(hashPass);
        bcrypt.compare(password, hashPass, (err, isEqual) => {
          if (isEqual) {
            req.session.userId = results[0].id;
            console.log(req.session.userId);
            req.session.email = results[0].email;
            console.log(req.session.email);
            res.redirect("/list-top");
          } else {
            errorMessage.push("ログイン情報が正しくありません。");
            res.render("login.ejs", {
              errorUndefined: [],
              errorUnmatch: errorMessage,
            });
          }
        });
      }
    );
  }
);

module.exports = router;
