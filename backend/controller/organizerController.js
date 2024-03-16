// controller/studentController.js
const BloodCampOrganizer = require('../models/organizerModel');
const jwt = require('jsonwebtoken');

const registerBloodCampOrg = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, password, imageFront, imageBack, accountStatus } = req.body;

    // Create a new BloodCampOrganizer object with file paths
    const newOrganizer = new BloodCampOrganizer({
      firstName,
      lastName,
      mobile,
      email,
      password,
      imageFront,
      imageBack,
      accountStatus
    });

    // Save the BloodCampOrganizer object to MongoDB
    await newOrganizer.save();

    // Respond with the registered BloodCampOrganizer object and file paths
    res.json({
      message: 'BloodCampOrganizer registered successfully',
      organizer: {
        firstName,
        lastName,
        mobile,
        email,
        password,
        _id: newOrganizer._id,
        imageFront,
        imageBack
      },
    });
  } catch (error) {
    console.error('Error registering BloodCampOrganizer:', error);
    res.status(500).json({ error: 'Error registering BloodCampOrganizer' });
  }
};

const loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const organizer = await BloodCampOrganizer.findOne({ email });

    if (!organizer) {
      res.status(404).json({ error: 'BloodCampOrganizer not found' });
      return;
    }

    const isPasswordValid = await organizer.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    req.session.organizer = organizer._id;
    // Generate JWT token
    const token = jwt.sign({ email: organizer.email, _id: organizer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Function to get all BloodCampOrganizers
const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await BloodCampOrganizer.find();
    res.json({ organizers });
  } catch (error) {
    console.error('Error fetching BloodCampOrganizers:', error);
    res.status(500).json({ error: 'Error fetching BloodCampOrganizers' });
  }
};

// Function to get one BloodCampOrganizer by ID
const getOneOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await BloodCampOrganizer.findById(id);
    if (!organizer) {
      res.status(404).json({ error: 'BloodCampOrganizer not found' });
      return;
    }
    res.json({ organizer });
  } catch (error) {
    console.error('Error fetching BloodCampOrganizer:', error);
    res.status(500).json({ error: 'Error fetching BloodCampOrganizer' });
  }
};

// Function to delete a BloodCampOrganizer by ID
const deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrganizer = await BloodCampOrganizer.findByIdAndDelete(id);
    if (!deletedOrganizer) {
      res.status(404).json({ error: 'BloodCampOrganizer not found' });
      return;
    }
    res.json({ message: 'BloodCampOrganizer deleted successfully' });
  } catch (error) {
    console.error('Error deleting BloodCampOrganizer:', error);
    res.status(500).json({ error: 'Error deleting BloodCampOrganizer' });
  }
};

const updateOrganizerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountStatus } = req.body;

    // Find the organizer by ID and update its account status
    const updatedOrganizer = await BloodCampOrganizer.findByIdAndUpdate(id, { accountStatus }, { new: true });

    if (!updatedOrganizer) {
      res.status(404).json({ error: 'BloodCampOrganizer not found' });
      return;
    }

    res.json({ message: 'BloodCampOrganizer status updated successfully', organizer: updatedOrganizer });
  } catch (error) {
    console.error('Error updating organizer status:', error);
    res.status(500).json({ error: 'Error updating organizer status' });
  }
};

module.exports = {
  registerBloodCampOrg,
  loginOrganizer,
  getAllOrganizers,
  getOneOrganizer,
  deleteOrganizer,
  updateOrganizerStatus
};
