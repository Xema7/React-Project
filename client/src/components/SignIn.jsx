import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (!formData.identifier || !formData.password) {
      alert("Both fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !emailRegex.test(formData.identifier) &&
      formData.identifier.length < 3
    ) {
      alert("Please enter a valid email or username!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/signin", formData);
      if (response.data.success) {
        // Redirect to profile page with username
        navigate("/profile", { state: { username: response.data.username } });
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">SignIn</h2>
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Username or Email"
        value={formData.identifier}
        onChange={(e) =>
          setFormData({ ...formData, identifier: e.target.value })
        }
      />
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button 
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition" 
        onClick={handleSignIn}>
        Sign In
      </button>
      <p className="mt-4 text-center text-gray-600">
        New User? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link> Here
      </p>
    </div>
    </div>
  );
};

export default SignIn;
