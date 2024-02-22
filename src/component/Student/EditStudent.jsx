// EditStudent.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditStudent.css'; // Import a separate CSS file for styles

function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [updatedStudentData, setUpdatedStudentData] = useState({
    StudentId: '',
    FirstName: '',
    LastName: '',
    Age: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/${id}`);
        setStudent(response.data);
        setUpdatedStudentData({
          StudentId: response.data.StudentId,
          FirstName: response.data.FirstName,
          LastName: response.data.LastName,
          Age: response.data.Age,
        });
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is 'Age', parse it as an integer
    const parsedValue = name === 'Age' ? parseInt(value, 10) : value;

    setUpdatedStudentData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedStudentData);
      const response = await axios.put(
        `http://localhost:5000/students/${id}`,
        updatedStudentData
      );
      console.log("Server response:", response.data);
      // onClose(); // Uncomment this line if you have a function to close the modal
      window.location.href = '/student'; // Redirect to your desired path
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (!student) {
    return <p>Loading or error occurred...</p>;
  }

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="StudentId" className="form-label">
            Student ID
          </label>
          <input
            type="text"
            className="form-control"
            id="StudentId"
            name="StudentId"
            value={updatedStudentData.StudentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="FirstName"
            name="FirstName"
            value={updatedStudentData.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="LastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="LastName"
            name="LastName"
            value={updatedStudentData.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="Age"
            name="Age"
            value={updatedStudentData.Age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
