// EditTeacher.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditTeacher.css'; // Import a separate CSS file for styles

function EditTeacher() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [updatedTeacherData, setUpdatedTeacherData] = useState({
    FirstName: '',
    LastName: '',
    Age: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/teachers/${id}`);
        setTeacher(response.data);
        setUpdatedTeacherData({
          FirstName: response.data.FirstName,
          LastName: response.data.LastName,
          Age: response.data.Age,
        });
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is 'Age', parse it as an integer
    const parsedValue = name === 'Age' ? parseInt(value, 10) : value;

    setUpdatedTeacherData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedTeacherData);
      const response = await axios.put(
        `http://localhost:5000/teachers/${id}`,
        updatedTeacherData
      );
      console.log("Server response:", response.data);
      // onClose(); // Uncomment this line if you have a function to close the modal
      window.location.href = '/teacher'; // Redirect to your desired path
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  if (!teacher) {
    return <p>Loading...</p>; // You can customize the loading indicator as needed
  }

  return (
    <div className="edit-teacher-container">
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit}>
        {/* Display fetched teacher data */}
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="FirstName"
            name="FirstName"
            value={updatedTeacherData.FirstName}
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
            value={updatedTeacherData.LastName}
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
            value={updatedTeacherData.Age}
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

export default EditTeacher;
