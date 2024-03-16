import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UnderReview() {
  // Function to display a success toast
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Under Review Page</h1>
      <p className="text-lg text-gray-700 mb-8">Your account is currently under review.</p>
      <div className="w-24 h-24 border-4 border-gray-400 rounded-full animate-spin"></div>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
}

export default UnderReview;
