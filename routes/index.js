const express = require("express");
const router = express.Router();
const model = require("../models/model");

router.get("/", (req, res, next) => {
  res.render("top.ejs");
});

module.exports = router;
