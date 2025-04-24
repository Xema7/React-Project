import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateProfile() {
  const navigate = useNavigate();
  

  // State for username and email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/updateprofile"); // Use Axios for GET request
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
  }, []);

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put('/api/updateprofile', { // Use Axios for PUT request
        username,
        email,
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/profile'); // Redirect to the profile page after update
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile();
        }}
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;