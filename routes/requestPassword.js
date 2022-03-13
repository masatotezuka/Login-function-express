const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");
const config = require("../config/mail");

router.get("/", (req, res, next) => {
  res.render("requestPassword.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email;

    util.validationPostUserData(email, "Not written Email");

    const emailFromUserModel = await users.findUser(email);
    util.mailCheck(emailFromUserModel, null, "Not Found User");

    const currentToken = util.createUuid();
    await users.updateToken(currentToken, email);

    await sendGmail(emailFromUserModel.email, currentToken, res);
    res.render("afterPostedMail.ejs");
  } catch (error) {
    return res.render("requestPassword.ejs", { messages: error.message });
  }
});

//https://www.npmjs.com/package/gmail-send
async function sendGmail(postUserEmail, currentToken, res) {
  try {
    const send = require("gmail-send")({
      user: config.HOSTGMAIL,
      pass: config.HOSTGMAILPASSWORD,
      to: postUserEmail,
      subject: "パスワードを設定してください",
      text: `パスワードのリセットを承りました。
        下記URLより、パスワードを再設定してください。
        http://localhost:8000/resetpassword/${currentToken}`,
    });
    await send();
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = router;
