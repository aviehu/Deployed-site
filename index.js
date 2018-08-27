// server
const express = require('express');

const app = express();
const path = require('path');
const pg = require('pg');

const connectionString = 'postgres://postgres:aqswde@localhost:5432/postgres';

app.set('port', process.env.PORT || 5000);

// Our first route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/Dev', (req, res) => {
  pg.connect(
    connectionString,
    (err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        res.status(400).send(err);
      }
      client.query('SELECT * FROM Dev where id = $1', [1], (
        result,
      ) => {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    },
  );
});

// Listen to port
app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`);
});
