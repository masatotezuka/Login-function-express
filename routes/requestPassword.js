const express = require("express");
const router = express.Router();
const model = require("../models/model");
const users = require("../models/users");
const middleware = require("../middleware");
const config = require("../config/config");

router.get("/", (req, res, next) => {
  res.render("request-password.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const postUserData = req.body;
  const messages = [];
  middleware.validationPostUserData(
    postUserData,
    messages,
    "Not wrriten Email"
  );
  const emailFromuserdb = await users.findUser(postUserData);
  await sendGamil(postUserData, emailFromuserdb, messages);
  if (messages.length > 0) {
    res.render("request-password.ejs", { messages: messages });
  } else {
    res.render("after-post-mail.ejs");
  }
});

//Ref:https://www.npmjs.com/package/gmail-send
const sendGamil = async (postUserData, emailFromuserdb, messages) => {
  try {
    if (emailFromuserdb === null) {
      messages.push("Not found Email");
    } else {
      const send = require("gmail-send")({
        user: config.HOSTGMAIL,
        pass: config.HOSTGMAILPASSWORD,
        to: postUserData.email,
        subject: "パスワードを設定してください",
        text: `パスワードのリセットを承りました。
        下記ＵＲＬより、パスワードを再設定してください。
        http://localhost:8000/resetpassword/${postUserData.email}`,
      });
      await send();
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = router;
