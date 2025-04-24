import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route path="/" element = {<HomePage />} />
        <Route path="/userlist" element = {<UserList />} /> */}
        <Route path="/signin" element = {<SignIn />} />
        <Route path="/signup" element = {<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
