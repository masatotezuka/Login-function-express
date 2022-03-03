const express = require("express");
const router = express.Router();

//ログアウト
router.post("/", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) throw error;
    console.log("deleted session");
    res.redirect("/");
  });
});

module.exports = router;
