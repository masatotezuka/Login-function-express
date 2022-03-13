const express = require("express");

const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");

router.get("/", async (req, res, next) => {
  res.render("signup.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  try {
    const signupUserData = req.body;

    validationSignupData(signupUserData);

    const userDataFromUsers = await users.findUser(signupUserData.email);
    if (userDataFromUsers !== null) {
      util.mailCheck(
        userDataFromUsers.email,
        signupUserData.email,
        "Invalid value"
      );
    }

    const hashText = await util.createHash(signupUserData.password);
    await users.createUser(signupUserData, hashText);
    const newUserFromUsers = await users.findUser(signupUserData.email);

    req.session.userId = newUserFromUsers.id;
    res.redirect("/list-top");
  } catch (error) {
    res.render("signup.ejs", { messages: error.message });
  }
});

function validationSignupData(signupUserData) {
  util.validationPostUserData(signupUserData.firstName, "Not written name");
  util.validationPostUserData(signupUserData.lastName, "Not written name");
  util.validationPostUserData(signupUserData.email, "Not written email");
  util.validationPostUserData(signupUserData.password, "Not written password");
}

module.exports = router;
