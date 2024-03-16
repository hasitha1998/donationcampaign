import React, { useState, useContext } from 'react';
import axios from "axios";
import DonorContext from "../../context/DonorContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.success("Donor signup successful!")
function DonorSignup() {
  const PRESET_NAME = "g0q5rala";
  const CLOUD_NAME = "dv8fo0kwp";
  const navigate = useNavigate();


  // Array of blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  
  const { submitDonor } = useContext(DonorContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [password, setPassword] = useState('');
  const [imageFront, setFront] = useState("");
  const [imageBack, setRear] = useState("");
  const [urlf, setUrlf] = useState("");
  const [urlr, setUrlr] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track image upload status


  const submitFront = (e) => {
    const image = e.target.files[0];
    setFront(image);
    const data1 = new FormData();
    data1.append("file", image);
    data1.append("upload_preset", PRESET_NAME);
    data1.append("cloud_name", CLOUD_NAME);

    setIsUploading(true); // Set uploading status to true

    axios
      .post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data1)
      .then((res) => {
        const url1 = res.data.secure_url;
        setUrlf(url1);
        console.log(url1)
        setIsUploading(false); // Set uploading status to false after successful upload
      })
      .catch((err) => {
        console.log(err);
        setIsUploading(false); // Set uploading status to false if upload fails
      });
  };
  const submitRear = (e) => {
    const image = e.target.files[0];
    setRear(image);
    const data1 = new FormData();
    data1.append("file", image);
    data1.append("upload_preset", PRESET_NAME);
    data1.append("cloud_name", CLOUD_NAME);

    setIsUploading(true); // Set uploading status to true

    axios
      .post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data1)
      .then((res) => {
        const url1 = res.data.secure_url;
        setUrlr(url1);
        console.log(url1)
        setIsUploading(false); // Set uploading status to false after successful upload
      })
      .catch((err) => {
        console.log(err);
        setIsUploading(false); // Set uploading status to false if upload fails
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   console.log("hs"+urlf)

  //   // Check if both front and rear image URLs are not empty
  //   if (urlf && urlr) {
  //     const newDonor = {
  //       firstName: firstName,
  //       lastName: lastName,
  //       mobile: mobile,
  //       email: email,
  //       bloodGroup: bloodGroup,
  //       password: password,
  //       imageFront: urlf,
  //       imageBack: urlr,
  //       accountStatus: accountStatus
  //     };
  //     submitDonor(newDonor);
  //   } else {
  //     alert("Please upload both front and rear images before submitting.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("hs"+urlf)

    // Check if both front and rear image URLs are not empty
    if (urlf && urlr) {
      const newDonor = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        bloodGroup: bloodGroup,
        password: password,
        imageFront: urlf,
        imageBack: urlr,
      };

      try {
        await submitDonor(newDonor);
        // If submission is successful, display success toast and redirect to under-review page
        toast.success("Donor signup successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/under-review');
      } catch (error) {
        console.error('Error submitting donor:', error);
        // Display error toast if submission fails
        toast.error("Failed to submit donor. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      alert("Please upload both front and rear images before submitting.");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-[52rem] mt-5 mb-5">
        <h2 className="text-2xl font-semibold mb-4">User Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">Mobile</label>
            <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block text-gray-700 font-semibold mb-2">Blood Group</label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <div className="flex justify-center space-x-4">
            <div className="max-w-xs rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  <label className="block mb-2 text-gray-500">NIC Front Image</label>
                  <div className="flex items-center justify-center">
                    <label className="flex flex-col w-full h-32 border-4 border-gray-400 border-dashed hover:bg-gray-100 hover:border-red-700">
                      {urlf === "" ? (
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Attach a file</p>
                        </div>
                      ) : (
                        <div className="ml-2 mt-2">
                          {urlf === "" ? <h3>uploading...</h3> : <img className="w-28 h-28" src={urlf} alt="Front ID" />}
                        </div>
                      )}
                      <input type="file" className="opacity-0" onChange={submitFront} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="max-w-xs rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  <label className="block mb-2 text-gray-500">NIC Rear Image</label>
                  <div className="flex items-center justify-center">
                    <label className="flex flex-col w-full h-32 border-4 border-gray-400 border-dashed hover:bg-gray-100 hover:border-red-700">
                      {urlr === "" ? (
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Attach a file</p>
                        </div>
                      ) : (
                        <div className="ml-2 mt-2">
                          {urlr === "" ? <h3>uploading...</h3> : <img className="w-28 h-28" src={urlr} alt="Rear ID" />}
                        </div>
                      )}
                      <input type="file" className="opacity-0" onChange={submitRear} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 mb-6 text-center">
            <button
              className="w-1/2 px-4 py-2 font-bold text-white bg-red-700 rounded-lg hover:bg-red-900 focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
              disabled={isUploading} // Disable button if uploading
            >
              {isUploading ? 'Uploading...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default DonorSignup