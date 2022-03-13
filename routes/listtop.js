const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.userId === undefined) {
    res.redirect("/login");
  } else {
    res.render("listPage.ejs");
  }
});

module.exports = router;
