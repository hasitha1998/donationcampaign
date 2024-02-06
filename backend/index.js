
const express = require('express');
require('dotenv').config();
const session = require('express-session');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());

// Session configuration middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret', 
    resave: false, // Do not resave the session if it hasn't been modified
    saveUninitialized: true, // Save uninitialized sessions
  })
);
// Routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
