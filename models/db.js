const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: "sqlite",
    storage: "something.sqlite"
});

exports.db = db;
