const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
  res.render('login.ejs');
});


module.exports = router;
