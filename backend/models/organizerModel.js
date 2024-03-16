const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const organizerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  password: String,
  imageFront: {
    type: String,
    required: true,
  },
  imageBack: {
    type: String,
    required: true,
  },
  accountStatus: {
    type: String,
    enum: ["pending", "active", "block"],
    default: "pending",
  },
});

// Hash the password before saving to the database
organizerSchema.pre('save', async function (next) {
  try {
    // Check if password is modified or new, and ensure it's not empty
    if (this.isModified('password') || this.isNew) {
      if (!this.password) {
        throw new Error('Password is required');
      }

      // Hash the password with a salt of 10 rounds
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword; // Replace the original password with the hashed one
    }
    next(); // Move to the next middleware
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Method to compare hashed password during login
organizerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
