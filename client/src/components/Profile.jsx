import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const username = state?.username || "Guest";
  const email = state?.email || "Guest";

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        alert('User deleted successfully!');
        navigate('/'); // Redirect to home page after deletion
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div>
      <p>Welcome! {username}</p>

      <button onClick={() => navigate('/updateprofile' , { state: { username, email } })}>Edit Profile</button>
      <button onClick={handleDeleteUser}>Delete</button>
    </div>
  );
}

export default Profile;