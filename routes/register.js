const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const model = require("../models/model");
const users = require("../models/users");
const middleware = require("../middleware");

router.get("/", (req, res, next) => {
  res.render("register.ejs", { errorUndefined: [], errorDuplicate: [] });
  next();
});

router.post("/", async (req, res, next) => {
  const signupUserData = req.body;
  const messages = [];
  // 空入力の判定
  validationSignupData(signupUserData, messages);
  const userdataFromdbusers = await users.findUser(signupUserData);
  if (userdataFromdbusers !== null) {
    middleware.mailCheck(
      userdataFromdbusers.email,
      signupUserData.email,
      messages,
      "Already exist user Email"
    );
  }
  console.log(userdataFromdbusers);
  const hashText = await createHash(signupUserData);
  await users.createUser(signupUserData, hashText);
  if (messages.length > 0) {
    res.status(400).render("register.ejs", { messages: messages });
  } else {
    req.session.userId = userData.id;
    res.status(200).redirect("/list-top");
  }
});

const validationSignupData = (signupUserData, messages) => {
  if ((signupUserData.first === "") | (signupUserData.last === "")) {
    messages.push("Not written name");
  }
  if (signupUserData.email === "") {
    messages.push("Not written Email");
  }
  if (signupUserData.password === "") {
    messagess.push("Not written password");
  }
};

const createHash = async (signupUserData) => {
  const hash = await bcrypt.hash(signupUserData.password, 10);
  return hash;
};

module.exports = router;
