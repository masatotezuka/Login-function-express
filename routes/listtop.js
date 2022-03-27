const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   if (req.session.userId === undefined) {
//     res.redirect("/login");
//   } else {
//     res.render("listPage.ejs");
//   }
// });

router.get("/", (req, res) => {
  if (req.session.userId == undefined) {
    res.redirect("/login");
  } else {
    res.render("listPage.ejs");
  }
});
module.exports = router;
