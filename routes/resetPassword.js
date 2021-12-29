const express = require("express");
const router = express.Router();
const model = require("../models/model");
const users = require("../models/users");
const middleware = require("../middleware");

router.get("/:email", (req, res) => {
  res.render("reset-password.ejs", {
    messages: [],
    email: [req.params.email],
  });
  console.log(req.params.email);
});

router.post("/:email", async (req, res) => {
  // const postUserPasswordData = req.body
  try {
    const password = req.body.password;
    const email = req.params.email;
    const hashText = await middleware.createHash(password);
    await users.updateUser(hashText, email);
    const updateUserData = await users.findUser(email);
    req.session.userId = updateUserData.id;
    console.log("アップデート完了");
    res.status(200).redirect("/list-top");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
