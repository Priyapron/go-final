// AddTeacherPopup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddTeacherPopup.css'; // Import the CSS file

const AddTeacherPopup = ({ onClose, onAddTeacher }) => {
  const [newTeacher, setNewTeacher] = useState({
    FirstName: '',
    LastName: '',
    age: '', // Consider changing the type to a number if it's expected as a number
  });

  const addTeacher = async () => {
    try {
      // Validate the required fields before submitting
      if (!newTeacher.FirstName || !newTeacher.LastName || !newTeacher.age) {
        console.error('Please fill in all fields');
        return;
      }

      const response = await axios.post('http://localhost:5000/teachers', {
        ...newTeacher,
        age: parseInt(newTeacher.age, 10), // Convert Age to number
      });

      onAddTeacher(response.data);
      setNewTeacher({
        FirstName: '',
        LastName: '',
        age: '',
      });
      onClose();
    } catch (error) {
      console.error('Error adding teacher:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Add Teacher</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newTeacher.FirstName}
          onChange={(e) => setNewTeacher({ ...newTeacher, FirstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newTeacher.LastName}
          onChange={(e) => setNewTeacher({ ...newTeacher, LastName: e.target.value })}
        />
        <input
          type="text" // Consider changing to type="number" if age is expected as a number
          placeholder="Age"
          value={newTeacher.age}
          onChange={(e) => setNewTeacher({ ...newTeacher, age: e.target.value })}
        />
        <button className="primary" onClick={addTeacher}>
          Add Teacher
        </button>
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTeacherPopup;
