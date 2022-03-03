const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.userId === undefined) {
    res.status(400).render("login.ejs", { message: [] });
  } else {
    res.status(200).render("list-page.ejs");
  }
});

module.exports = router;
