// EditSubject.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditSubject.css'; // Import a separate CSS file for styles

function EditSubject() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [updatedSubjectData, setUpdatedSubjectData] = useState({
    Subject_id: '',
    Subject_name: '',
    Subject_credit: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/subjects/${id}`);
        setSubject(response.data);
        setUpdatedSubjectData({
          Subject_id: response.data.Subject_id,
          Subject_name: response.data.Subject_name,
          Subject_credit: response.data.Subject_credit,
        });
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is 'Subject_credit', parse it as an integer
    const parsedValue = name === 'Subject_credit' ? parseInt(value, 10) : value;

    setUpdatedSubjectData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedSubjectData);
      const response = await axios.put(
        `http://localhost:5000/subjects/${id}`,
        updatedSubjectData
      );
      console.log("Server response:", response.data);
      // onClose(); // Uncomment this line if you have a function to close the modal
      window.location.href = '/subject'; // Redirect to your desired path
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  if (!subject) {
    return <p>Loading or error occurred...</p>;
  }

  return (
    <div className="edit-subject-container">
      <h2>Edit Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Subject_id" className="form-label">
            Subject ID
          </label>
          <input
            type="text"
            className="form-control"
            id="Subject_id"
            name="Subject_id"
            value={updatedSubjectData.Subject_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Subject_name" className="form-label">
            Subject Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Subject_name"
            name="Subject_name"
            value={updatedSubjectData.Subject_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Subject_credit" className="form-label">
            Subject Credit
          </label>
          <input
            type="text"
            className="form-control"
            id="Subject_credit"
            name="Subject_credit"
            value={updatedSubjectData.Subject_credit}
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

export default EditSubject;
