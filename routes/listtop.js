const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(req.session.userId);
  if (req.session.userId === undefined) {
    res.render("login.ejs", { errorUndefined: [], errorUnmatch: [] });
  } else {
    res.render("listpage.ejs");
  }
});

module.exports = router;
