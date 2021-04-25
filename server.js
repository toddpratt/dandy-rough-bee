const express = require("express");
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const {db} = require('./models/db');
const {User} = require('./models/user');
const {UniqueConstraintError} = require("sequelize");

db.sync();

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

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
    const users = await User.findAll({where: {email}});
    if (users.length === 1) {
        const user = users[0];
        if (await bcrypt.compare(password, user.get('hash'))) {
            const token = jsonwebtoken.sign({userId: user.get('id')}, process.env.SECRET, { expiresIn: '1800s' });
            response.json({token, userId: user.get('id')});
        } else {
            response.sendStatus(401);
        }
    } else if (users.length === 0) {
        response.sendStatus(401);
    } else {
        response.sendStatus(500);  // should never happen
    }
});

app.post("/api/v1/register", async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    if (email === undefined || password === undefined) {
        response.sendStatus(400);
        return;
    }
    const hash = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({email, hash});
        response.json({success: true, newId: newUser.get('id')});
    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            response.sendStatus(409);
        } else {
            console.error(e);
            response.sendStatus(500);
        }
    }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
