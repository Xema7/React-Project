import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSignIn = () => {
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
    console.log("User signed in:", formData);
  };

  return (
    <div>
      <h2>SignIn</h2>
      <input
        type="text"
        placeholder="Username or Email"
        value={formData.identifier}
        onChange={(e) =>
          setFormData({ ...formData, identifier: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <p>
        New User? <Link to="/signup">Signup</Link> Here
      </p>
    </div>
  );
};

export default SignIn;
