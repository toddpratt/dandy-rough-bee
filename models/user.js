const { Model, DataTypes } = require('sequelize');

const {db} = require('./db');

class User extends Model {}
User.init({
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  hash: DataTypes.STRING
}, { sequelize: db, modelName: 'user' });

exports.User = User;
