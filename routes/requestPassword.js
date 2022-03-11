const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");
const config = require("../config/mail");

router.get("/", (req, res, next) => {
  res.render("requestPassword.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const email = req.body.email;
  const messages = [];

  util.validationPostUserData(email, messages, "Not written Email");
  if (messages.length > 0) {
    return res.render("requestPassword.ejs", messages);
  }

  const emailFromUserModel = await users.findUser(email);
  const currentToken = util.createUuid();
  await users.updateToken(currentToken, email);

  await sendGmail(email, emailFromUserModel, currentToken, res);
  res.render("afterPostedMail.ejs");
});

//https://www.npmjs.com/package/gmail-send
const sendGmail = (postUserEmail, emailFromUserModel, token, res) => {
  try {
    if (emailFromUserModel === null) {
      res
        .status(404)
        .render("requestPassword.ejs", { messages: ["Not found Email"] });
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
      send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = router;
