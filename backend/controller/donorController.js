// controller/studentController.js
const Donor = require('../models/donorModel');
const jwt = require('jsonwebtoken');

const registerDonor = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email,bloodGroup, password,imageFront,imageBack,accountStatus } = req.body;

    

    // Create a new student object with file paths
    const newDonor = new Donor({
      firstName,
      lastName,
      mobile,
      email,
      bloodGroup,
      password,
      imageFront,
      imageBack,
      accountStatus
    });

    // Save the student object to MongoDB
    await newDonor.save();

    // Respond with the registered student object and file paths
    res.json({
      message: 'Donor registered successfully',
      donor: newDonor

      
    });
  } catch (error) {
    console.error('Error registering donor:', error);
    res.status(500).json({ error: 'Error registering donor' });
  }
};

const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });

    if (!donor) {
      res.status(404).json({ error: 'Donor not found' });
      return;
    }

    const isPasswordValid = await donor.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    req.session.donor = donor._id;
    // Generate JWT token
    const token = jwt.sign({ email: donor.email, _id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set JWT token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful', donor });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Function to get all students
const getAllDonors = async (req, res) => {
  try {
    const donor = await Donor.find();
    res.json({ donor });
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Error fetching donors' });
  }
};

// Function to get one student by ID
const getOneDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await donor.findById(id);
    if (!donor) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json({ donor });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// Function to delete a student by ID
const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonor = await Student.findByIdAndDelete(id);
    if (!deletedDonor) {
      res.status(404).json({ error: 'Donor not found' });
      return;
    }
    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    console.error('Error deleting donor:', error);
    res.status(500).json({ error: 'Error deleting donor' });
  }
};
const updateDonorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountStatus } = req.body;

    // Find the organizer by ID and update its account status
    const updatedDonor = await Donor.findByIdAndUpdate(id, { accountStatus }, { new: true });

    if (!updatedDonor) {
      res.status(404).json({ error: 'Donor not found' });
      return;
    }

    res.json({ message: 'Donor status updated successfully', donor: updatedDonor });
  } catch (error) {
    console.error('Error updating donor status:', error);
    res.status(500).json({ error: 'Error updating donor status' });
  }
};
const getDonorStatus = async (req, res) => {
  try {
    const { email } = req.body;
    const donor = await Donor.findOne({ email });

    if (!donor) {
      res.status(404).json({ error: 'Donor not found' });
      return;
    }

    res.json({ status: donor.accountStatus });
  } catch (error) {
    console.error('Error fetching donor status:', error);
    res.status(500).json({ error: 'Error fetching donor status' });
  }
};

module.exports = {
  registerDonor,
  loginDonor,
  getAllDonors,
  getOneDonor,
  deleteDonor,
  updateDonorStatus,
  getDonorStatus
};
