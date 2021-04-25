const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const {db} = require('./models/db');
const {User} = require('./models/user');

db.sync();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json ());

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/api/v1/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  if (email === undefined || password === undefined) {
      response.sendStatus(400);
      return;
  }
  const whereClause = { email };
  rxjs.from(User.findAll({where: {email}})).subscribe(
      users => {
          if (users.length !== 1) {
              response.sendStatus(500);
          } else if (bcrypt.compareSync(password, users[0].get('hash'))) {
              // send token

          } else {
              response.sendStatus(401);
          }
      },
      error => {
          response.sendStatus(500);
      }
  );
});

app.post("/api/v1/register", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  if (email === undefined || password === undefined) {
      response.sendStatus(400);
      return;
  }
  const hash = bcrypt.hashSync(password, 10);
  rxjs.from(User.create({email, hash}))
      .subscribe(
          result => {
            response.json({success: true});
          },
          error => {
            response.sendStatus(500);
          }
      );
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
