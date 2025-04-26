import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch user data from the backend
        const fetchUsers = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/users/");
            const result = await res.json();
            if (result.success){
              setUsers(result.data);
            }else console.error(result.message);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchUsers();
      }, []); // Empty dependency array ensures this runs only once
  
      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
    
        try {
          const res = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "DELETE",
          });
          const result = await res.json();
          if (result.success) {
            setUsers(users.filter((user) => user._id !== id)); // Remove user from state
            alert("User deleted successfully!");
          } else {
            alert(result.message);
          }
        } catch (err) {
          console.error(err);
          alert("Failed to delete user.");
        }
      };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">User List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{user.username}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  <Link to={{ pathname: "/updateprofile", }} state= {{ id: user._id }}>Edit</Link></button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(user._id)}>
                  Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;