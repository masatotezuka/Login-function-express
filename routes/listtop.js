const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(req.session);
  if (req.session.userId === undefined) {
    res.redirect("/login");
  } else {
    res.status(200).render("listPage.ejs");
  }
});

module.exports = router;
