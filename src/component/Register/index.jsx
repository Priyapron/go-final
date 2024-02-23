// RegisterUser.jsx

import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    profile: '',
    password: '',
  });

  const [isPopupOpen, setPopupOpen] = useState(true);

  const handleClose = () => {
    setPopupOpen(false);
    // Redirect to the login page
    window.location.href = '/'; // Adjust the path as needed
  };

  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', {
        ...newUser,
        password: await hashPassword(newUser.password),
      });

      // Handle registered user data if needed
      console.log('User registered:', response.data);

      setNewUser({
        name: '',
        email: '',
        profile: '',
        password: '',
      });

      handleClose();
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error as needed
    }
  };

  const hashPassword = async (password) => {
    return password;
  };

  return (
    <>
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <h2>Register User</h2>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Profile"
              value={newUser.profile}
              onChange={(e) => setNewUser({ ...newUser, profile: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button className="primary" onClick={registerUser}>
              Register
            </button>
            <button className="secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterUser;
