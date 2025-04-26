import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function UpdateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  

  // State for username and email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (id) {

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`); // Use Axios for GET request
        const result = res.data;
        if (result.success) {
          setUsername(result.data.username); // Set username
          setEmail(result.data.email); // Set email
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserDetails();
  }}, [id]);

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, {username, email}); 

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/'); // Redirect to the profile page after update
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-center text-2xl font-bold mb-4">Update Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile();
        }}
      >
        <div>
          <label htmlFor="username" className="text-gray-700 font-bold mb-2 block" >Username:</label>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-gray-700 font-bold mb-2 block">Email:</label>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            required
          />
        </div>
        <button type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >Update Profile</button>
      </form>
    </div>
    </div>
  );
}

export default UpdateProfile;