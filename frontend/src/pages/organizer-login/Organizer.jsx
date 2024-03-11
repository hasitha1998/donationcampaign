import React, { useState } from 'react';
import mainImage from '../../assets/main_image.jpg';
import formImage from '../../assets/image6.png'; // Import the background image for the login page

function Organizer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Validate email
    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    // Validate password
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    // Set errors
    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Submit form
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center mt-10">
      {/* Card containing login form and image */}
      <div className="bg-white p-8 rounded-lg shadow-md flex items-center justify-center w-max md:w-3/4 lg:w-1/2">
        {/* Login form */}
        <div className="flex flex-col justify-center items-center w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
            </div>
            <button type="submit" className="bg-red-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600">Login</button>
          </form>
          <p className="mt-4">
            Don't have an account? 
            <a href="#" className="text-blue-500 ml-1">Sign up</a>
          </p>
        </div>
        {/* Image */}
        <div className="hidden md:block md:w-1/3 md:pl-8">
          <img src={formImage} alt="Login Image" className="w-48 h-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Organizer;
