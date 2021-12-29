const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const model = require("../models/model");
const users = require("../models/users");
const middleware = require("../middleware");

router.get("/", (req, res, next) => {
  res.render("login.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const loginUserData = req.body;
  const messages = [];
  mailAndPasswordValidation(loginUserData, messages);
  const userFromdb = await users.findUser(loginUserData.email);
  middleware.mailCheck(userFromdb, null, messages, "Not found Email");
  if (userFromdb !== null) {
    await passwordCompare(
      loginUserData.password,
      userFromdb.password,
      messages
    );
  }

  if (messages.length > 0) {
    res.status(400).render("login.ejs", { messages: messages });
  } else {
    req.session.userId = userFromdb.id;
    res.status(200).redirect("/list-top");
  }
});

//未入力チェック
const mailAndPasswordValidation = (loginUserData, messages) => {
  middleware.validationPostUserData(
    loginUserData.email,
    messages,
    "Not written Email"
  );
  middleware.validationPostUserData(
    loginUserData.email,
    messages,
    "Not written password"
  );
};

const passwordCompare = async (loginPassword, fromdbPassword, messages) => {
  const comparedResult = await bcrypt.compare(loginPassword, fromdbPassword);
  if (comparedResult) {
    console.log("compare OK");
  } else {
    messages.push("Not found Password");
  }
};

module.exports = router;

// バリデーション・エラーのミドルウェアを作成する
//再利用
