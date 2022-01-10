const express = require("express");
const router = express.Router();
const model = require("../models/model");
const users = require("../models/users");
const middleware = require("../middleware");

router.get("/", (req, res, next) => {
  res.render("signup.ejs", { messages: [] });
  next();
});

router.post("/", async (req, res, next) => {
  const signupUserData = req.body;
  const messages = [];
  console.log(signupUserData.first);
  validationSignupData(signupUserData, messages);
  const userdataFromdbusers = await users.findUser(signupUserData.email);
  if (userdataFromdbusers !== null) {
    middleware.mailCheck(
      userdataFromdbusers.email,
      signupUserData.email,
      messages,
      "Already exist user Email"
    );
  }
  const hashText = await middleware.createHash(signupUserData.password);
  await users.createUser(signupUserData, hashText);
  if (messages.length > 0) {
    console.log(messages);
    res.status(400).render("signup.ejs", { messages: messages });
  } else {
    const newuserFromdbusers = await users.findUser(signupUserData);
    req.session.userId = newuserFromdbusers.id;
    res.status(200).redirect("/list-top");
  }
});

const validationSignupData = (signupUserData, messages) => {
  middleware.validationPostUserData(
    signupUserData.first,
    messages,
    "Not written name"
  );
  middleware.validationPostUserData(
    signupUserData.last,
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
