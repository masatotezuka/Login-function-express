const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const utility = require("../utility/index");

router.get("/:email", (req, res) => {
  res.render("reset-password.ejs", {
    messages: [],
    email: [req.params.email],
  });
});

router.post("/:email", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.params.email;
    const messages = [];
    utility.validationPostUserData(password, messages, "Not written password");
    utility.errorHandle("reset-password.ejs", messages);
    const hashText = await utility.createHash(password);
    await users.updateUser(hashText, email);
    const updateUserData = await users.findUser(email);
    req.session.userId = updateUserData.id;
    res.status(200).redirect("/list-top");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
