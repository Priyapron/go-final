// EditUser.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditUser.css'; // Import a separate CSS file for styles

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    Name: '',
    Email: '',
    Profile: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(response.data);
        setUpdatedUserData({
          Name: response.data.Name,
          Email: response.data.Email,
          Profile: response.data.Profile,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Change from 'Name' to 'name'
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedUserData);
      const response = await axios.put(
        `http://localhost:5000/users/${id}`,
        updatedUserData
      );
      console.log("Server response:", response.data);
      // onClose(); // Uncomment this line if you have a function to close the modal
      window.location.href = '/user'; // Redirect to your desired path
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <p>Loading or error occurred...</p>;
  }

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            Name="Name"
            value={updatedUserData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="Email"
            className="form-control"
            id="Email"
            Name="Email"
            value={updatedUserData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Profile" className="form-label">
            Profile
          </label>
          <input
            type="text"
            className="form-control"
            id="Profile"
            Name="Profile"
            value={updatedUserData.Profile}
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

export default EditUser;
