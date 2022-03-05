const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const utility = require("../utility/index");
const config = require("../config/config");
const res = require("express/lib/response");

router.get("/", (req, res, next) => {
  res.render("request-password.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const postUserEmail = req.body.email;
  // オブジェクトのままでは渡せない. https://hdix.hatenablog.com/entry/2018/01/05/163935
  const messages = [];
  utility.validationPostUserData(postUserEmail, messages, "Not wrriten Email");
  utility.errorHandle("request-password.ejs", messages);
  const emailFromuserdb = await users.findUser(postUserEmail);
  await sendGamil(postUserEmail, emailFromuserdb, messages);
  utility.errorHandle("request-password.ejs", messages);
  res.render("after-post-mail.ejs");
});

//Ref:https://www.npmjs.com/package/gmail-send
const sendGamil = async (postUserEmail, emailFromuserdb, messages) => {
  try {
    if (emailFromuserdb === null) {
      messages.push("Not found Email");
    } else {
      const send = require("gmail-send")({
        user: config.HOSTGMAIL,
        pass: config.HOSTGMAILPASSWORD,
        to: postUserEmail,
        subject: "パスワードを設定してください",
        text: `パスワードのリセットを承りました。
        下記ＵＲＬより、パスワードを再設定してください。
        http://localhost:8000/resetpassword/${postUserEmail}`,
      });
      await send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = router;
