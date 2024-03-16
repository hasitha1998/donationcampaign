

const express = require('express');
require('dotenv').config();
const session = require('express-session');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const campRoutes = require('./routes/campRoutes');
const donorRoutes = require('./routes/DonorRoutes');
const cors = require('cors');

const app = express();

// Connect to MongoDB
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // enable credentials if necessary
}));
// Session configuration middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false, // Do not resave the session if it hasn't been modified
    saveUninitialized: true, // Save uninitialized sessions
  })
);
// Routes
app.use('/users', userRoutes);
app.use('/organizer', cors(), organizerRoutes);
app.use('/camp', cors(), campRoutes);
app.use('/donor', cors(), donorRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
