const sequelize = require('../config/database');
const User = require('./User');
const Score = require('./Score');

const syncDatabase = async () => {
  await sequelize.sync({ force: true }); // Use { force: true } for development to drop and recreate tables
  console.log('Database synced');
};

module.exports = { sequelize, User, Score, syncDatabase };