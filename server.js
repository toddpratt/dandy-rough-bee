const express = require("express");
const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const app = express();
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/api/v1/login", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
