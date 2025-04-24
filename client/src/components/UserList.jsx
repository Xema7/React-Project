import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch user data from the backend
        const fetchUsers = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/users/userlist");
            const result = await res.json();
            if (result.success) setUsers(result.data);
            else console.error(result.message);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchUsers();
      }, []); // Empty dependency array ensures this runs only once

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
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{user.username}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;