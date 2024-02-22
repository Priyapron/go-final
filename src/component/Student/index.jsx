// StudentManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentPopup from './AddStudentPopup';

import { Link } from 'react-router-dom';
import './StudentManagement.css'; // Import a separate CSS file for styles

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddStudentPopupOpen, setIsAddStudentPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch and set the initial list of students from the backend
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/students',
    });

    axiosInstance.get('http://localhost:5000/students').then((response) => setStudents(response.data));
  }, []);

  const searchStudents = () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/students',
    });

    axiosInstance.get(`http://localhost:5000/students?query=${searchQuery}`).then((response) => setStudents(response.data));
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:5000/students',
        });

        await axiosInstance.delete(`http://localhost:5000/students/${studentId}`);
        setStudents((prevStudents) => prevStudents.filter((student) => student.ID !== studentId));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleAddStudent = (newStudentData) => {
    // Logic to handle adding a student, e.g., updating state or making API calls
    console.log('New student data:', newStudentData);
    // You can also fetch the updated list of students here if needed
  };

  const openAddStudentPopup = () => {
    setIsAddStudentPopupOpen(true);
  };

  const closeAddStudentPopup = () => {
    setIsAddStudentPopupOpen(false);
  };

  return (
    <div className="student-management-container">
      <h2>Student Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or grade"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchStudents}>Search</button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.ID}>
              <td>{student.ID}</td>
              <td>{student.StudentId}</td>
              <td>{student.FirstName}</td>
              <td>{student.LastName}</td>
              <td>{student.Age}</td>
              <td>
                
                <Link to={`/editStudent/${student.ID}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(student.ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<br />
      <button className="add-button" onClick={openAddStudentPopup}>
        Add Student
      </button>

      {isAddStudentPopupOpen && (
        <AddStudentPopup onClose={closeAddStudentPopup} onAddStudent={handleAddStudent} />
      )}
    </div>
  );
};

export default StudentManagement;
