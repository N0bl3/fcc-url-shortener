"use strict"
let express = require('express');

let app = express();
let generatedURLs = [];

app.use(express.static("client"));
app.get("/", function(){
  app.render("index.html");
});
app.get("/new/*", function(req, res){
  let url = req.params[0];
  
  if ( /^https?\:\/\/(www\.)?[\w\d]+\.\w+\/?$/i.test(url) === true ){
    let shortenedURL = "https://fcc-url-shortener-n0bl3.herokuapp.com/" + generatedURLs.length;
    generatedURLs.push(url);
    let json = {
      url,
      shortenedURL
    };
    res.end(JSON.stringify(json));
  } else {
    res.status(400).end("Error 400: Bad Request");
  }
});
app.get("/*", function(req, res){
  let target = req.params[0];
  console.log(target);
  if ( /^\d+$/.test(target) && generatedURLs[target] ) {
    res.redirect(generatedURLs[target]);
  } else {
    res.status(400).end("Error 400: Bad request");
  }
});
app.listen(process.env.PORT || 3000, function(err){
  if (!err){
    console.log("Server started");
  } else {
    console.log(err);
  }
});
