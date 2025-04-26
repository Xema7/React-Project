import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage.jsx';
import SignUp from './components/SignUp.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/signup" element = {<SignUp />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
      </Routes>
    </div>
  )
}

export default App
