const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGODB_URI, {
    // Use the latest URL parser for MongoDB connection strings
    useNewUrlParser: true,
    // Use a unified topology for MongoDB connections
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function () {
    console.log('Connected to MongoDB');
  });

  module.exports = db;
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
}
