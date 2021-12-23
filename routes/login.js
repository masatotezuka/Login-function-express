const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../models/db");
const model = require("../models/model");
const crud = require("../models/crud");

console.log("GET login");
router.get("/", (req, res, next) => {
  res.render("login.ejs", { errorMessage: [] });
});

router.post("/", (req, res, next) => {
  const bodyData = req.body;
  //バリデーション（ミドルウェア）
  mailAndPasswordValidation(bodyData);
  emailMatch(bodyData);
  passwordMatch(bodyData);
  const dbUsers = crud.findAllUsers();
  res.status(404).send("Sorry, we cannot find that!");
  console.log(dbUsers);
});

//未入力チェック
const mailAndPasswordValidation = (bodyData) => {
  const errorMessage = { emailError: "", passwordError: "" };
  const email = req.body.email;
  const password = req.body.password;
  console.log(`email:${email} , password:${password}`);
  console.log("POST処理完了");
  // 正しかったらTRUE まちがっていたらFALSE
  //エラーメッセージがあったら、エラーを返す
  if (email === "") {
    errorMessage.emailError = "Invalid params";
    console.log(`email error`, errorMessage);
  }
  if (password === "") {
    errorMessage.passwordError = "Invalid params";
    console.log(`password error`, errorMessage);
  }
  // 上に記述
  // if (errorMessage.length > 0) {
  //   console.log(errorMessage);
  res.sendStatus(400);
  // } else {
  // }
};

//メールアドレスチェック
const emailMatch = (req, res, next) => {
  const errorMessage = { emailUnmacth: "" };
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) throw err;
      //エラー対応
      if (results[0] === undefined) {
        errorMessage.emailUnmatch = "Invalid params";
        res.status(400).render("login.ejs", { errorMessage: errorMessage });
      } else {
        next();
      }
    }
  );
};

// const emailMatch = (req, res, next) => {
//   const errorMessage = { emailUnmacth: "" };
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(email, password);
//   connection.query(
//     "SELECT * FROM users WHERE email = ?",
//     [email],
//     (err, results) => {
//       if (err) throw err;
//       //エラー対応
//       if (results[0] === undefined) {
//         errorMessage.emailUnmatch = "Invalid params";
//         res.status(400).render("login.ejs", { errorMessage: errorMessage });
//       } else {
//         next();
//       }
//     }
//   );
// };

//パスワードチェック
const passwordMatch = (req, res) => {
  const errorMessage = { passwordUnmatch: "" };
  const email = req.body.email;
  const password = req.body.password;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      const hashPass = results[0].password;
      console.log(hashPass);
      bcrypt.compare(password, hashPass, (err, isEqual) => {
        if (isEqual) {
          req.session.userId = results[0].id;
          res.redirect("/list-top");
        } else {
          //エラー対応
          errorMessage.passwordUnmatch = "Invalid params";
          res.status(400).render("login.ejs", { errorMessage: errorMessage });
        }
      });
    }
  );
};

module.exports = router;

// バリデーション・エラーのミドルウェアを作成する
//再利用
