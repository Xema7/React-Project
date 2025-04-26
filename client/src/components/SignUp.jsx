import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleAddUser = async () => {
    const { username, email} = formData;

  // Basic validation
  if (!username || !email) {
    alert("All fields are required!");
    return;
  }

  // Username validation
  if (username.length < 3) {
    alert("Username must be at least 3 characters long.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
    try{
      const response = await axios.post("http://localhost:5000/api/users/signup", formData);      
      if(response.status === 201) {
        alert("User registered successfully!");
        console.log("User registered:", formData);
      }else{
        alert("Failed to register user. Please try again.");
      }
    }catch(error){
      console.error("Error registering user:", error);
      alert("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleAddUser}>
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >
        SignUp
      </button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
