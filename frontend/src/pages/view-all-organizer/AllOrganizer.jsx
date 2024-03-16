import React, { useEffect, useContext, useState } from 'react';
import OrganizerContext from '../../context/OrganizerContext';
import ImageModal from './ImageModel';

import axios from 'axios';

function AllOrganizer() {
  const { organizers, getAllOrganizers } = useContext(OrganizerContext);
  const [status, setStatus] = useState('all');
  const [img, setImg] = useState('');
  const [showModal, setShowModal] = useState("false");

  const handleOnClose = () => {
		setShowModal("false");
	};

	const setVisibility = (img) => {
		setShowModal("true");
		setImg(img);
	};


  useEffect(() => {
    getAllOrganizers();
  }, []); // Fetch organizers when component mounts

  // Function to handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/organizers/${id}`, { accountStatus: newStatus });
      // Optionally, you can fetch all organizers again to update the UI
      getAllOrganizers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Check if organizers or organizers.students is undefined
  if (!organizers || !organizers.students) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-300">
      <h1 className="text-3xl font-semibold mb-4">All Organizers</h1>
      {/* Dropdown for status filter */}
      <div className="mb-4">
        <label htmlFor="status" className="mr-2">Filter by status:</label>
        <select id="status" className="border rounded-md px-2 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="block">Block</option>
        </select>
      </div>
      {/* Table to display organizers */}
      
<table className="table-auto w-full">
  <thead>
    <tr>
      <th className="border px-4 py-2">First Name</th>
      <th className="border px-4 py-2">Last Name</th>
      <th className="border px-4 py-2">Email</th>
      <th className="border px-4 py-2">Mobile</th>
      <th className="border px-4 py-2">ID Front</th>
      <th className="border px-4 py-2">ID Back</th>
      <th className="border px-4 py-2">Change Status</th>
      <th className="border px-4 py-2">Status</th> {/* New column for colored dots */}
    </tr>
  </thead>
  <tbody>
    {organizers.students.map((organizer) => (
      <tr key={organizer._id}>
        <td className="border px-4 py-2">{organizer.firstName}</td>
        <td className="border px-4 py-2">{organizer.lastName}</td>
        <td className="border px-4 py-2">{organizer.email}</td>
        <td className="border px-4 py-2">{organizer.mobile}</td>
        <td className="border px-4 py-2"><button onClick={() => setVisibility(organizer.imageFront)}><img src={organizer.imageFront}></img></button></td>
        <td className="border px-4 py-2"><button onClick={() => setVisibility(organizer.imageBack)}><img src={organizer.imageBack}></img></button></td>
        <td className="border px-4 py-2">
          <select className="border rounded-md px-2 py-1 justify-center" value={organizer.accountStatus} onChange={(e) => handleStatusChange(organizer._id, e.target.value)}>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="block">Block</option>
          </select>
        </td>
        <td className="border px-4 py-2">
          {organizer.accountStatus === 'pending' && <span className="h-2 w-2 inline-block bg-yellow-500 rounded-full"></span>}
          {organizer.accountStatus === 'active' && <span className="h-2 w-2 inline-block bg-green-500 rounded-full"></span>}
          {organizer.accountStatus === 'block' && <span className="h-2 w-2 inline-block bg-red-500 rounded-full"></span>}
        </td>
      </tr>
    ))}
  </tbody>
</table>

<ImageModal visible={showModal} onClose={handleOnClose} image={img} />

    </div>
  );
}

export default AllOrganizer;
