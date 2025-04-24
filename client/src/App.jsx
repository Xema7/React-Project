import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import UserList from './components/UserList.jsx';
import Navbar from './components/Navbar.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/userlist" element = {<UserList />} />
        <Route path="/signup" element = {<SignUp />} />
        <Route path="/signin" element = {<SignIn />} />
        <Route path="/profile" element = {<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
      </Routes>
    </div>
  )
}

export default App
