const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow cookies or credentials (if needed)
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/scores', require('./routes/scores'));

// Start the server
const PORT = process.env.PORT || 5000;
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});