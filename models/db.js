const { Sequelize } = require('sequelize');

const db = new Sequelize('sqlite::memory:');

exports.db = db;