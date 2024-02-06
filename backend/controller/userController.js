const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, password } = req.body;

    // Save the user details to MongoDB
    const newUser = new User({
      firstName,
      lastName,
      mobile,
      email,
      password,
      profilepic: req.file.path,
    });

    await newUser.save();

    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: 'User not found ' });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    // Set up a session 
    req.session.user = {
      id: user._id,
      email: user.email,
    };

    // For simplicity, returning the entire user object
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
