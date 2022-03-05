const express = require("express");
const router = express.Router();
const users = require("./users");
const middleware = require("../middlewares/middleware");

router.get("/", async (req, res, next) => {
  const db = await users.findAllUsers();
  res.render("signup.ejs", { messages: [] });
  next();
});

router.post("/", async (req, res, next) => {
  const signupUserData = req.body;
  const messages = [];
  validationSignupData(signupUserData, messages);
  console.log(signupUserData);
  const userDataFromUsers = await users.findUser(signupUserData.email);
  if (userDataFromUsers !== null) {
    middleware.mailCheck(
      userDataFromUsers.email,
      signupUserData.email,
      messages,
      "Already exist user Email"
    );
  }
  const hashText = await middleware.createHash(signupUserData.password);
  await users.createUser(signupUserData, hashText);
  if (messages.length > 0) {
    res.status(400).render("signup.ejs", { messages: messages });
  } else {
    const newUserFromUsers = await users.findUser(signupUserData.email);
    req.session.userId = newUserFromUsers.id;
    res.status(200).redirect("/list-top");
  }
});

const validationSignupData = (signupUserData, messages) => {
  middleware.validationPostUserData(
    signupUserData.firstName,
    messages,
    "Not written name"
  );
  middleware.validationPostUserData(
    signupUserData.lastName,
    messages,
    "Not written name"
  );
  middleware.validationPostUserData(
    signupUserData.email,
    messages,
    "Not written email"
  );
  middleware.validationPostUserData(
    signupUserData.password,
    messages,
    "Not written password"
  );
};

module.exports = router;
