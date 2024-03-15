import React, { useState } from 'react';
import axios from 'axios';
import Carousel from '../carousel';

const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
];

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    month: 1, // Default to January
    day_type: 'public',
    promotion_cost: 0 // Add a field for promotion cost
  });

  const [prediction, setPrediction] = useState(null);

  const handleFormDataChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        new URLSearchParams(formData) // Convert object to form data
      );

      // Handle the response data
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      // Clear the prediction if there is an error
      setPrediction(null);
    }
  };

  const handleRefresh = () => {
    // Clear the form fields and the prediction when the refresh button is pressed
    setFormData({
      month: 1,
      day_type: 'public',
      promotion_cost: 0
    });
    setPrediction(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-8 p-6  ">

    
    <div className="max-w-xl ml-8 p-6 mt-[4rem] bg-white rounded-lg shadow-lg bg-gradient-to-b from-red-500 via-red-300 to-slate-50">
    {/* <p className="text-lg font-extrabold text-white justify-center text-center ">
    "In the canvas of life, organizing a blood donation camp is like painting strokes of kindness that color the world with hope and healing."
</p> */}
    <div className="max-w-xl  mt-[4rem] p-8 bg-white rounded-lg shadow-lg mb-7">
    
    
      <p className="text-lg font-semibold mb-4">Attendance Prediction</p>
      <div className="mb-4">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Month:</label>
        <select
          id="month"
          className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.month}
          onChange={(e) => handleFormDataChange('month', parseInt(e.target.value))}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dayType" className="block text-sm font-medium text-gray-700 mb-1">Day Type:</label>
        <select
          id="dayType"
          className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.day_type}
          onChange={(e) => handleFormDataChange('day_type', e.target.value)}
        >
          <option value="public">Public</option>
          <option value="poyaday">Poya</option>
          <option value="weekday">Weekday</option>
          <option value="weekend">Weekend</option>
        </select>
      </div>
      {/* <div className="mb-4">
        <label htmlFor="promotionCost" className="block text-sm font-medium text-gray-700 mb-1">Promotion Cost:</label>
        <input
          type="number"
          id="promotionCost"
          className="form-input block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.promotion_cost}
          onChange={(e) => handleFormDataChange('promotion_cost', e.target.value)}
        />
      </div> */}
      <div className="flex space-x-4 ">
        <button
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleRequest}
        >
          Predict
        </button>
        <button
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
      {prediction !== null && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Predicted Number of Attendees</p>
          <p className="mt-2">{parseInt(prediction, 10)}</p>
        </div>
      )}
    </div>
    </div>
    <div className='mt-[4rem]'>
    <Carousel/>
    </div>
    
    </div>
    
  );
};

export default PredictionForm;
