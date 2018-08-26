// server
var express = require("express");
var app = express();
var path = require("path");
var pg = require("pg");
var connectionString = "postgres://postgres:aqswde@localhost:5432/postgres";

app.set("port", process.env.PORT || 5000);

// Our first route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/Dev", function(req, res, next) {
  pg.connect(
    connectionString,
    function(err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        res.status(400).send(err);
      }
      client.query("SELECT * FROM Dev where id = $1", [1], function(
        err,
        result
      ) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

// Listen to port
app.listen(app.get("port"), function() {
  console.log("App is listening on port " + app.get("port"));
});
