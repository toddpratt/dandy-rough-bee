const { Model, DataTypes } = require('sequelize');

const {db} = require('./db');

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize: db, modelName: 'user' });

exports.User = User;
