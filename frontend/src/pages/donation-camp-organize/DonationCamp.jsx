import React, { useState } from 'react';
import { useCampContext } from '../../context/DonationCampContext';

function DonationCamp() {
  const { createCamp } = useCampContext();
  const [formData, setFormData] = useState({
    organizerName: '',
    mobile: '',
    email: '',
    date: '',
    marketingSlip: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      marketingSlip: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    formDataWithFile.append('organizerName', formData.organizerName);
    formDataWithFile.append('mobile', formData.mobile);
    formDataWithFile.append('email', formData.email);
    formDataWithFile.append('date', formData.date);
    formDataWithFile.append('marketingSlip', formData.marketingSlip);

    createCamp(formDataWithFile);
    // Reset form data after submission
    setFormData({
      organizerName: '',
      mobile: '',
      email: '',
      date: '',
      marketingSlip: null
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Create Donation Camp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="organizerName" className="block text-gray-700 font-semibold">Organizer Name:</label>
          <input type="text" name="organizerName" id="organizerName" value={formData.organizerName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 font-semibold">Mobile:</label>
          <input type="text" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-semibold">Date:</label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <div className="mb-4">
          <label htmlFor="slipImage" className="block text-gray-700 font-semibold">Marketing Slip:</label>
          <input type="file" name="slipImage" id="slipImage" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Create Camp</button>
      </form>
    </div>
  );
}

export default DonationCamp;
