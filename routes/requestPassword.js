const express = require("express");
const router = express.Router();
const users = require("./users");
const middleware = require("../middleware");
const config = require("../config/config");

router.get("/", (req, res, next) => {
  res.render("request-password.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  // const postUserJSONData = JSON.stringify(req.body);
  // const postUserData = JSON.parse(postUserJSONData);
  const postUserEmail = req.body.email;
  // オブジェクトのままでは渡せない. https://hdix.hatenablog.com/entry/2018/01/05/163935
  const messages = [];
  middleware.validationPostUserData(
    postUserEmail,
    messages,
    "Not wrriten Email"
  );
  const emailFromuserdb = await users.findUser(postUserEmail);
  console.log(emailFromuserdb);
  await sendGamil(postUserEmail, emailFromuserdb, messages);
  if (messages.length > 0) {
    res.render("request-password.ejs", { messages: messages });
  } else {
    res.render("after-post-mail.ejs");
  }
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
    console.log(error);
  }
};
module.exports = router;
