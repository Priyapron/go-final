// TeacherManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTeacherPopup from './AddTeacherPopup';
import { Link } from 'react-router-dom';
import './TeacherManagement.css';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTeacherPopupOpen, setIsAddTeacherPopupOpen] = useState(false);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/teachers',
    });

    axiosInstance.get('http://localhost:5000/teachers').then((response) => setTeachers(response.data));
  }, []);

  const searchTeachers = () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/teachers',
    });

    axiosInstance.get(`http://localhost:5000/teachers?query=${searchQuery}`).then((response) => setTeachers(response.data));
  };

  const handleDeleteTeacher = async (teacherID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:5000/teachers',
        });

        await axiosInstance.delete(`http://localhost:5000/teachers/${teacherID}`);
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.ID !== teacherID));
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const onAddTeacher = (newTeacher) => {
    // Update the state or perform any other actions when a teacher is added
    // You can define your logic here
    console.log('Teacher added:', newTeacher);
  };

  const handleAddTeacher = async (newTeacherData) => {
    try {
      const response = await axios.post('http://localhost:5000/teachers', {
        ...newTeacherData,
        age: parseInt(newTeacherData.age, 10), // Convert Age to number
      });

      onAddTeacher(response.data);

      // Reset the page by reloading it
      window.location.reload();
    } catch (error) {
      console.error('Error adding teacher:', error);
      // Handle error as needed
    }
  };

  const openAddTeacherPopup = () => {
    setIsAddTeacherPopupOpen(true);
  };

  const closeAddTeacherPopup = () => {
    setIsAddTeacherPopupOpen(false);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const searchTermLower = searchQuery.toLowerCase();

    return (
      teacher.ID.toString().includes(searchTermLower) ||
      teacher.FirstName.toLowerCase().includes(searchTermLower) ||
      teacher.LastName.toLowerCase().includes(searchTermLower) ||
      teacher.Age.toString().includes(searchTermLower)
    );
  });

  return (
    <div className="teacher-management-container">
      <h2>Teacher Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID, First Name, Last Name, or Age"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchTeachers}>Search</button>
      </div>

      <table className="teacher-table">
        <thead>
          <tr>
            
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => (
            <tr key={teacher.ID}>
              
              <td>{teacher.FirstName}</td>
              <td>{teacher.LastName}</td>
              <td>{teacher.Age}</td>
              <td>
                <Link to={`/editTeachers/${teacher.ID}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDeleteTeacher(teacher.ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button className="add-button" onClick={openAddTeacherPopup}>
        Add Teacher
      </button>

      {isAddTeacherPopupOpen && (
        <AddTeacherPopup onClose={closeAddTeacherPopup} onAddTeacher={handleAddTeacher} />
      )}
    </div>
  );
};

export default TeacherManagement;
