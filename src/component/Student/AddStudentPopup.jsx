// AddStudentPopup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddStudentPopup.css'; // Import the CSS file

const AddStudentPopup = ({ onClose, onAddStudent }) => {
  const [newStudent, setNewStudent] = useState({
    StudentId: '',
    FirstName: '',
    LastName: '',
    Age: '',
  });

  const addStudent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/students', {
        ...newStudent,
        Age: parseInt(newStudent.Age, 10), // Convert Age to number
      });
      onAddStudent(response.data);
      setNewStudent({
        StudentId: '',
        FirstName: '',
        LastName: '',
        Age: '',
      });
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Add Student</h2>
        <input
          type="text"
          placeholder="Student ID"
          value={newStudent.StudentId}
          onChange={(e) => setNewStudent({ ...newStudent, StudentId: e.target.value })}
        />
        <input
          type="text"
          placeholder="First Name"
          value={newStudent.FirstName}
          onChange={(e) => setNewStudent({ ...newStudent, FirstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.LastName}
          onChange={(e) => setNewStudent({ ...newStudent, LastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={newStudent.Age}
          onChange={(e) => setNewStudent({ ...newStudent, Age: e.target.value })}
        />
        <button className="primary" onClick={addStudent}>
          Add Student
        </button>
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddStudentPopup;
