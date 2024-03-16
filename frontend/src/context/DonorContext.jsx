import React, { createContext, useContext, useState } from 'react';
import DonorAPI from './api/donorAPI';

const DonorContext = createContext();

export const useDonorContext = () => useContext(DonorContext);

export const DonorProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);

  const [donor,setDonor] = useState({
    firstName : "",
    lastName : "",
    mobile : "",
    email : "",
    bloodGroup : "",
    password : "",
    imageFront : "",
    imageBack : "",
    
  });

  const submitDonor = async (values) => {
    try {

      console.log("context:"+ values.imageFront)
      console.log("context1:"+ values.imageBack)

      const response = await DonorAPI.register(values);
      setDonors([...donors, response.data]);
      console.log('Registration successful:', response.data);
      // Handle successful registration response
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  };
  const loginDonor = async (email, password) => {
    try {
      const response = await DonorAPI.login(email, password);
      // Set the donor data in context or localStorage
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  // Function to fetch all donors
  const getAllDonors = async () => {
    try {
      const response = await DonorAPI.getDonors();
      setDonors(response.data);
      setLoading(false); // Set loading to false after data is fetched
      console.log('Donors fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const getOneDonor = async (id) => {
    try {
      const response = await DonorAPI.getOne(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching organizer:', error);
      return null;
    }
  };

  const deleteDonor = async (id) => {
    try {
      await DonorAPI.delete(id);
      setDonors(donors.filter((donor) => donor._id !== id));
      console.log('Donor deleted successfully');
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  return (
    <DonorContext.Provider value={{ donors, 
    submitDonor,
    getAllDonors, 
    getOneDonor,
    deleteDonor,
    loginDonor,
    donor,
    setDonor }}>
      {children}
    </DonorContext.Provider>
  );
};

export default DonorContext;
