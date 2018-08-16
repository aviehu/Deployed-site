// server
var express = require("express");
var app = express();
var path = require("path");
app.set("port", process.env.PORT || 5000);

// Our first route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Listen to port
app.listen(app.get("port"), function() {
  console.log("App is listening on port " + app.get("port"));
});
