const express = require("express");
const router = express.Router();

//ログアウト
router.post("/", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) throw error;
    res.redirect("/");
  });
});

module.exports = router;
