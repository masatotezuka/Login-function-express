const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../models/db");

router.get("/", (req, res, next) => {
  res.render("register.ejs", { errorUndefined: [], errorDuplicate: [] });
  next();
});

router.post(
  "/",
(req, res, next) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const password = req.body.password;
    const errorMessage = [];
    // 空入力の判定
    if ((firstName === "") | (lastName === "")) {
      errorMessage[0] = "氏名が未入力です。";
    }
    if (email === "") {
      errorMessage[1] = "メールアドレスが未入力です。";
    }
    if (password === "") {
      errorMessage[2] = "パスワードが未入力です";
    }
    if (errorMessage.length > 0) {
      console.log("未入力あり");
      res.render("register.ejs", {
        errorUndefined: errorMessage,
        errorDuplicate: [],
      });
    } else {
      next();
    }
  },
  //メールアドレスの重複チェック
  (req, res, next) => {
    const email = req.body.email;
    const errorMessage = [];
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) throw err;
        console.log(results);
        console.log(results.length);
        if (results.length > 0) {
          errorMessage.push("既に登録済みのメールアドレスです。");
          res.render("register.ejs", {
            errorUndefined: [],
            errorDuplicate: errorMessage,
          });
          console.log("メールアドレスは重複しています。");
        } else {
          next();
        }
      }
    );
  },
  (req, res, next) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const password = req.body.password;
    console.log("データ受け取り完了");
<<<<<<< HEAD
=======
    console.log(req.body.password);
>>>>>>> develop2
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      console.log(password, hash);
      connection.query(
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)",
        [firstName, lastName, email, hash],
        (err, results) => {
          if (err) throw err;
          req.session.userId = results.insertId;
          console.log(req.session.userId);
          res.redirect("/list-top");
        }
      );
    });
  }
);

module.exports = router;
