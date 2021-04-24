const { Model, DataTypes } = require('sequelize');

const {db} = require('./db');
console.log('db', db);

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, { db, modelName: 'user' });

exports.User = User;