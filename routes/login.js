const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../controllers/users");
const util = require("../util/index");

//ログイン画面
router.get("/", (req, res, next) => {
  res.render("login.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const loginUserData = req.body;
  const messages = [];

  mailAndPasswordValidation(loginUserData, messages);
  const userFromUserModel = await users.findUser(loginUserData.email);
  util.mailCheck(userFromUserModel, null, messages, "Not found Email");
  if (messages.length > 0)
    return res.status(400).render("login.ejs", { messages: messages });

  if (userFromUserModel === null) {
    return res.status(500).render("login.ejs");
  } else {
    const comparedResult = await bcrypt.compare(
      loginUserData.password,
      userFromUserModel.password
    );
    if (comparedResult) {
      req.session.userId = userFromUserModel.id;
      res.redirect("/list-top");
    } else {
      res.status(500).render("login.ejs", { messages: messages });
    }
  }
});

//未入力チェック
const mailAndPasswordValidation = (loginUserData, messages) => {
  util.validationPostUserData(
    loginUserData.email,
    messages,
    "Not written Email"
  );
  util.validationPostUserData(
    loginUserData.email,
    messages,
    "Not written password"
  );
};

module.exports = router;
