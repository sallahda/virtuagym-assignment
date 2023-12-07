const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/**
 * 
 * Model for the User table.
 */

class User extends Model {}

User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'user' });

module.exports = User;
