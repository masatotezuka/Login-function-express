const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const utility = require("../utility/index");

router.get("/", async (req, res, next) => {
  const db = await users.findAllUsers();
  res.render("signup.ejs", { messages: [] });
  next();
});

router.post("/", async (req, res, next) => {
  const signupUserData = req.body;
  const messages = [];
  validationSignupData(signupUserData, messages);
  const userDataFromUsers = await users.findUser(signupUserData.email);
  if (userDataFromUsers !== null) {
    utility.mailCheck(
      userDataFromUsers.email,
      signupUserData.email,
      messages,
      "Already exist user Email"
    );
  }
  if (messages.length > 0) {
    res.status(400).render("signup.ejs", { messages: messages });
  } else {
    const hashText = await utility.createHash(signupUserData.password);
    await users.createUser(signupUserData, hashText);
    const newUserFromUsers = await users.findUser(signupUserData.email);
    req.session.userId = newUserFromUsers.id;
    res.status(200).redirect("/list-top");
  }
});

const validationSignupData = (signupUserData, messages) => {
  utility.validationPostUserData(
    signupUserData.firstName,
    messages,
    "Not written name"
  );
  utility.validationPostUserData(
    signupUserData.lastName,
    messages,
    "Not written name"
  );
  utility.validationPostUserData(
    signupUserData.email,
    messages,
    "Not written email"
  );
  utility.validationPostUserData(
    signupUserData.password,
    messages,
    "Not written password"
  );
};

module.exports = router;
