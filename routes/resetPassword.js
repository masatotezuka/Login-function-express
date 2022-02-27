const express = require("express");
const router = express.Router();
const users = require("./users");
const middleware = require("../middleware");

router.get("/:email", (req, res) => {
  res.render("reset-password.ejs", {
    messages: [],
    email: [req.params.email],
  });
  console.log(req.params.email);
});

router.post("/:email", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.params.email;
    const messages = [];
    middleware.validationPostUserData(
      password,
      messages,
      "Not written password"
    );
    const hashText = await middleware.createHash(password);
    await users.updateUser(hashText, email);
    const updateUserData = await users.findUser(email);

    if (messages.length > 0) {
      res.status.render("reset-password.ejs", { messages: messages });
    } else {
      req.session.userId = updateUserData.id;
      res.status(200).redirect("/list-top");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
