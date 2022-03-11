const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");

router.get("/", async (req, res, next) => {
  res.render("signup.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  const signupUserData = req.body;
  const messages = [];

  validationSignupData(signupUserData, messages);
  if (messages.length > 0) {
    return res.render("signup.ejs", { messages: messages });
  }

  const userDataFromUsers = await users.findUser(signupUserData.email);
  if (userDataFromUsers !== null) {
    util.mailCheck(
      userDataFromUsers.email,
      signupUserData.email,
      messages,
      "Already exist user Email"
    );
    return res.status(500).render("signup.ejs", { messages: messages });
  }

  const hashText = await util.createHash(signupUserData.password);
  await users.createUser(signupUserData, hashText);
  const newUserFromUsers = await users.findUser(signupUserData.email);

  req.session.userId = newUserFromUsers.id;
  res.status(200).redirect("/list-top");
});

const validationSignupData = (signupUserData, messages) => {
  util.validationPostUserData(
    signupUserData.firstName,
    messages,
    "Not written name"
  );
  util.validationPostUserData(
    signupUserData.lastName,
    messages,
    "Not written name"
  );
  util.validationPostUserData(
    signupUserData.email,
    messages,
    "Not written email"
  );
  util.validationPostUserData(
    signupUserData.password,
    messages,
    "Not written password"
  );
};

module.exports = router;
