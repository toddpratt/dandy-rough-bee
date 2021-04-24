const express = require("express");
const bcrypt = require('bcrypt');
const operators = "rxjs";

const {User} = require('./models/user');

const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/api/v1/login", (request, response) => {
  const username = request.args.username;
  const password = request.args.password;
  const hash = bcrypt.hashSync(password, 10);

});

app.post("/api/v1/register", (request, response) => {
  const username = request.args.username;
  const password = request.args.password;
  const hash = bcrypt.hashSync(password, 10);
  User.create({});

});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
