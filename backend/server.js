const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/scores', require('./routes/scores'));

const PORT = process.env.PORT || 5000;
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});