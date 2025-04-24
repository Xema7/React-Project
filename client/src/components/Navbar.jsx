import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
      <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
      <li><Link to="/userlist" className="hover:text-gray-300">User List</Link></li>
      </ul>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/signin">SignIn</Link>
      </button>
    </nav>
  )
}

export default Navbar;
