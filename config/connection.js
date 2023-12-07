const { Sequelize } = require('sequelize');

// Configuration for the PostgreSQL database.
const sequelize = new Sequelize('virtuagym', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});

module.exports = sequelize;
