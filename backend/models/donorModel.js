const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const donorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  password: String,
  bloodGroup: String,
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

  donorSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      console.error('Error hashing password:', error);
      next(error);
    }
  });

// Method to compare hashed password during login
donorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
