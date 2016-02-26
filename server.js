var express = require('express');

var app = express();
app.use(express.static("client"))
.get("/", function(){
  app.render("index.html");
})
.get("/new/:url", function(req, res){
  var url = req.params.url;
  if ( url === /^https?:\/\/[\w\d]+\.[\w]+\/?$/i){
    var shortenedURL = "http://fcc-url-shortener-n0bl3.herokuapp.com/x";
    var json = {
      url,
      shortenedURL
    };
    res.end(json);
  } else {
    res.status(400).end("Error 400: Bad Request");
  }
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server started");
});
