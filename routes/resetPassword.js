const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const util = require("../util/index");
const { Users } = require("../models");

router.get("/:token", (req, res) => {
  res.render("reset-password.ejs", {
    messages: [],
    token: [req.params.token],
  });
});

router.post("/:token", async (req, res) => {
  try {
    const password = req.body.password;
    const currentToken = req.params.token;
    const messages = [];

    util.validationPostUserData(password, messages, "Not written password");
    if (messages.length > 0) {
      return res
        .status(400)
        .render("reset-password.ejs", { messages: messages });
    }

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
    res.status(200).redirect("/list-top");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
