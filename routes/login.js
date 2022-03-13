const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../controllers/users");
const util = require("../util/index");

router.get("/", (req, res, next) => {
  res.render("login.ejs", { messages: [] });
});

router.post("/", async (req, res, next) => {
  try {
    const loginUserData = req.body;

    mailAndPasswordValidation(loginUserData);
    const userFromUserModel = await users.findUser(loginUserData.email);
    util.mailCheck(userFromUserModel, null, "Not Found User");

    if (userFromUserModel !== null) {
      const comparedResult = await bcrypt.compare(
        loginUserData.password,
        userFromUserModel.password
      );
      if (comparedResult) {
        req.session.userId = userFromUserModel.id;
        res.redirect("/list-top");
      } else {
        throw new Error("Not Found User");
      }
    }
  } catch (error) {
    return res.render("login.ejs", { messages: error.message });
  }
});

const mailAndPasswordValidation = (loginUserData) => {
  util.validationPostUserData(loginUserData.email, "Not written Email");
  util.validationPostUserData(loginUserData.email, "Not written password");
};

module.exports = router;
