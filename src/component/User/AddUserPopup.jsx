// AddUserPopup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddUserPopup.css'; // Import the CSS file

const AddUserPopup = ({ onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    profile: '',
    password: '', // Added password field
  });

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', {
        ...newUser,
        password: await hashPassword(newUser.password), // Assuming you have a function to hash the password
      });
      onAddUser(response.data);
      setNewUser({
        name: '',
        email: '',
        profile: '',
        password: '',
      });
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error as needed
    }
  };

  const hashPassword = async (password) => {
    // Implement your password hashing logic here, for example using bcrypt or another secure method
    // Ensure this is done on the server side for security reasons
    // This is a simple example, and you should use a library or service for real-world applications
    return password; // In this example, it just returns the plain password (not secure)
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Add User</h2>
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
        <button className="primary" onClick={addUser}>
          Add User
        </button>
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUserPopup;
