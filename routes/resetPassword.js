const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");
const { Users } = require("../models");

router.get("/:token", (req, res) => {
  res.render("resetPassword.ejs", {
    messages: [],
    token: [req.params.token],
  });
});

router.post("/:token", async (req, res) => {
  try {
    const password = req.body.password;
    const currentToken = req.params.token;

    util.validationPostUserData(password, "Not written password");
    const hashText = await util.createHash(password);

    const updateUserData = await Users.findOne({
      where: { verificationToken: currentToken },
    });

    await Users.update(
      {
        password: password,
        verificationToken: null,
      },
      {
        where: { verificationToken: currentToken },
      }
    );

    req.session.userId = updateUserData.id;
    res.redirect("/list-top");
  } catch (error) {
    res.render("resetPassword.ejs", { messages: error.message });
  }
});

module.exports = router;
