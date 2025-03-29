const express = require('express');
const router = express.Router();
const { Score, User } = require('../models');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { value } = req.body;
  try {
    const score = await Score.create({ value, UserId: req.user.id });
    res.status(201).json({ message: 'Score saved', score });
  } catch (error) {
    res.status(400).json({ message: 'Error saving score', error });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const scores = await Score.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['value', 'DESC']],
      limit: 10,
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const scores = await Score.findAll({
      where: { UserId: req.user.id },
      order: [['value', 'DESC']],
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user scores', error });
  }
});

module.exports = router;