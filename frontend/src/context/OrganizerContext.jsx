import React, { createContext, useContext, useState } from 'react';
import OrganizerAPI from './api/organizerAPI';

const OrganizerContext = createContext();

export const useOrganizerContext = () => useContext(OrganizerContext);

export const OrganizerProvider = ({ children }) => {
  const [organizers, setOrganizers] = useState([]);

  const [organizer,setOrganizer] = useState({
    firstName : "",
    lastName : "",
    mobile : "",
    email : "",
    password : "",
    imageFront : "",
    imageBack : "",
    
  });

  const submitOrganizer = async (values) => {
    try {

      console.log("context:"+ values.imageFront)
      console.log("context1:"+ values.imageBack)

      const response = await OrganizerAPI.register(values);
      setOrganizers([...organizers, response.data]);
      console.log('Registration successful:', response.data);
      // Handle successful registration response
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  };


  // Function to fetch all organizers
  const getAllOrganizers = async () => {
    try {
      const response = await OrganizerAPI.getOrganizers();
      setOrganizers(response.data);
      setLoading(false); // Set loading to false after data is fetched
      console.log('Organizers fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    }
  };

  const getOneOrganizer = async (id) => {
    try {
      const response = await OrganizerAPI.getOne(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching organizer:', error);
      return null;
    }
  };

  const deleteOrganizer = async (id) => {
    try {
      await OrganizerAPI.delete(id);
      setOrganizers(organizers.filter((organizer) => organizer._id !== id));
      console.log('Organizer deleted successfully');
    } catch (error) {
      console.error('Error deleting organizer:', error);
    }
  };

  return (
    <OrganizerContext.Provider value={{ organizers, submitOrganizer, getAllOrganizers, getOneOrganizer, deleteOrganizer,organizer,setOrganizer }}>
      {children}
    </OrganizerContext.Provider>
  );
};

export default OrganizerContext;
