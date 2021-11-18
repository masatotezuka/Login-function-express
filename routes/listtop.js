const express = require('express');
const { route } = require('.');
const router = express.Router();

router.get('/',(req,res,next) => {
  res.render('listpage.ejs');
})

module.exports =router;