const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");
const config = require("../config/mail");

router.get("/", (req, res, next) => {
  res.render("request-password.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const email = req.body.email;
  const messages = [];
  // オブジェクトのままでは渡せない. https://hdix.hatenablog.com/entry/2018/01/05/163935

  util.validationPostUserData(email, messages, "Not written Email");
  if (messages.length > 0) {
    return res.render("request-password.ejs", messages);
  }
  console.log(email);
  const emailFromUserModel = await users.findUser(email);
  console.log(emailFromUserModel);
  console.log(config.HOSTGMAIL);
  console.log(config.HOSTGMAILPASSWORD);
  const currentToken = util.createUuid();
  await users.updateToken(currentToken, email);

  await sendGmail(email, emailFromUserModel, currentToken, res);
  res.render("after-post-mail.ejs");
});

//Ref:https://www.npmjs.com/package/gmail-send
const sendGmail = async (postUserEmail, emailFromUserModel, token, res) => {
  try {
    if (emailFromUserModel === null) {
      res
        .status(404)
        .render("request-password.ejs", { messages: ["Not found Email"] });
    } else {
      const send = require("gmail-send")({
        user: config.HOSTGMAIL,
        pass: config.HOSTGMAILPASSWORD,
        to: postUserEmail,
        subject: "パスワードを設定してください",
        text: `パスワードのリセットを承りました。
        下記URLより、パスワードを再設定してください。
        http://localhost:8000/resetpassword/${token}`,
      });
      await send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = router;
