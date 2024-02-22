// SubjectManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSubjectPopup from './AddSubjectPopup';

import { Link } from 'react-router-dom';
import './SubjectManagement.css';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSubjectPopupOpen, setIsAddSubjectPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch and set the initial list of subjects from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchData();
  }, [isAddSubjectPopupOpen]);

  const searchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/subjects?query=${searchQuery}`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error searching subjects:', error);
    }
  };

  const handleDelete = async (subjectID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this subject?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/subjects/${subjectID}`);
        setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.ID !== subjectID));
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  const handleAddSubject = async (newSubjectData) => {
    try {
      await axios.post('http://localhost:5000/subjects', newSubjectData);
      setIsAddSubjectPopupOpen(false); // Close the popup
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const openAddSubjectPopup = () => {
    setIsAddSubjectPopupOpen(true);
  };

  const closeAddSubjectPopup = () => {
    setIsAddSubjectPopupOpen(false);
  };

  return (
    <div className="subject-management-container">
      <h2>Subject Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by subject name or credit"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchSubjects}>Search</button>
      </div>

      <table className="subject-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Subject Credit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.ID}>
              <td>{subject.ID}</td>
              <td>{subject.Subject_id}</td>
              <td>{subject.Subject_name}</td>
              <td>{subject.Subject_credit}</td>
              <td>
                <Link to={`/editSubject/${subject.ID}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(subject.ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button className="add-button" onClick={openAddSubjectPopup}>
        Add Subject
      </button>

      {isAddSubjectPopupOpen && (
        <AddSubjectPopup onClose={closeAddSubjectPopup} onAddSubject={handleAddSubject} />
      )}
    </div>
  );
};

export default SubjectManagement;
