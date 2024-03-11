import React, { createContext, useContext, useState } from 'react';
import CampAPI from './api/donationCampAPI';

const CampContext = createContext();

export const useCampContext = () => useContext(CampContext);

export const CampProvider = ({ children }) => {
  const [camps, setCamps] = useState([]);
  const [camp, setCamp] = useState({
    organizerName: "",
    mobile: "",
    email: "",
    date: "",
    slipImage: ""
  });

  const createCamp = async (values) => {
    try {
      const response = await CampAPI.createCamp(values);
      setCamps([...camps, response.data]);
      console.log('Camp created successfully:', response.data);
    } catch (error) {
      console.error('Error creating camp:', error);
    }
  };

  const getAllCamps = async () => {
    try {
      const response = await CampAPI.getAllCamps();
      setCamps(response.data);
      console.log('Camps fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const getCampById = async (id) => {
    try {
      const response = await CampAPI.getCampById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching camp by ID:', error);
      return null;
    }
  };

  const updateCamp = async (id, updatedCampData) => {
    try {
      const response = await CampAPI.updateCamp(id, updatedCampData);
      const updatedCamps = camps.map(camp => (camp._id === id ? response.data : camp));
      setCamps(updatedCamps);
      console.log('Camp updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating camp:', error);
    }
  };

  const deleteCamp = async (id) => {
    try {
      await CampAPI.deleteCamp(id);
      setCamps(camps.filter(camp => camp._id !== id));
      console.log('Camp deleted successfully');
    } catch (error) {
      console.error('Error deleting camp:', error);
    }
  };

  return (
    <CampContext.Provider value={{ camps, camp, createCamp, getAllCamps, getCampById, updateCamp, deleteCamp, setCamp }}>
      {children}
    </CampContext.Provider>
  );
};

export default CampContext;
