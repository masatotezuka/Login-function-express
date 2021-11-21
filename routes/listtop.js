const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
  console.log(req.session.userId);
  if(req.session.userId === undefined){
    res.render('login.ejs',{errorUndefined:[],errorUnmatch:[]});
  // res.status( 404 ); //. 404 エラー
  // console.dir(req.originalUrl) ;
  // console.dir() ;
  // console.dir(req.path) ;
  res.render( 'err404.ejs', { path: req.baseUrl });
  }else{
    res.render('listpage.ejs');
  }
})

module.exports =router;