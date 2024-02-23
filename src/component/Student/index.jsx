import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentPopup from './AddStudentPopup';
import { Link } from 'react-router-dom';
import './StudentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddStudentPopupOpen, setIsAddStudentPopupOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/students',
    });

    axiosInstance.get('http://localhost:5000/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const searchStudents = () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/students',
    });

    axiosInstance.get(`http://localhost:5000/students?query=${searchTerm}`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error searching students:', error));
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
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/students',
    });

    axiosInstance.post('http://localhost:5000/students', newStudentData)
      .then((response) => {
        console.log('New student data:', response.data);
        setIsAddStudentPopupOpen(false);
        // Fetch the updated list of students after successful addition
        fetchStudents();
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  const openAddStudentPopup = () => {
    setIsAddStudentPopupOpen(true);
  };

  const closeAddStudentPopup = () => {
    setIsAddStudentPopupOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      student.ID.toString().includes(searchTermLower) ||
      student.StudentId.toString().includes(searchTermLower) ||
      student.FirstName.toLowerCase().includes(searchTermLower) ||
      student.LastName.toLowerCase().includes(searchTermLower) ||
      student.Age.toString().includes(searchTermLower)
    );
  });

  return (
    <div className="student-management-container">
      <h2>Student Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID, Student ID, First Name, Last Name, or Age"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredStudents.map((student) => (
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
