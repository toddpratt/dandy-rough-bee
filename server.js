const express = require("express");
const bcrypt = require('bcrypt');
const operators = "rxjs";

const {User} = require('./models/user');

// const {db} = require('./models/db');
// console.log(db);

const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/api/v1/login", (request, response) => {
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
