const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.session.destroy(() => {
    try {
      res.redirect("/");
    } catch (error) {
      res.status(404).send(error);
    }
  });
});

module.exports = router;
