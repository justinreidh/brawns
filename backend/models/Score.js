const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Score = sequelize.define('Score', {
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Score.belongsTo(User);
User.hasMany(Score);

module.exports = Score;