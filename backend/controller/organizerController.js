// controller/studentController.js
const Student = require('../models/organizerModel');

const registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, password,imageFront,imageBack,accountStatus } = req.body;

    

    // Create a new student object with file paths
    const newStudent = new Student({
      firstName,
      lastName,
      mobile,
      email,
      password,
      imageFront,
      imageBack,
      accountStatus
    });

    // Save the student object to MongoDB
    await newStudent.save();

    // Respond with the registered student object and file paths
    res.json({
      message: 'Student registered successfully',
      student: {
        firstName,
        lastName,
        mobile,
        email,
        password,
        _id: newStudent._id,
        imageFront,
        imageBack

      },
      
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student' });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      res.status(404).json({ error: 'Student not found ' });
      return;
    }

    const isPasswordValid = await student.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    req.session.student = {
      id: student._id,
      email: student.email,
    };

    res.json({ message: 'Login successful', student });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Function to get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Function to get one student by ID
const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json({ student });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// Function to delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};
const updateOrganizerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountStatus } = req.body;

    // Find the organizer by ID and update its account status
    const updatedOrganizer = await Student.findByIdAndUpdate(id, { accountStatus }, { new: true });

    if (!updatedOrganizer) {
      res.status(404).json({ error: 'Organizer not found' });
      return;
    }

    res.json({ message: 'Organizer status updated successfully', organizer: updatedOrganizer });
  } catch (error) {
    console.error('Error updating organizer status:', error);
    res.status(500).json({ error: 'Error updating organizer status' });
  }
};
module.exports = {
  registerStudent,
  loginStudent,
  getAllStudents,
  getOneStudent,
  deleteStudent,
  updateOrganizerStatus
};
