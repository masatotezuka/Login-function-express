const express = require("express");
const router = express.Router();
const model = require("../models/model");

router.get("/", (req, res, next) => {
  res.render("top.ejs");
  model.sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});

module.exports = router;
