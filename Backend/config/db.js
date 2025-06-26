require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_name,
  process.env.user_DB,
  process.env.password_DB,
  {
    host: process.env.DB_host,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;