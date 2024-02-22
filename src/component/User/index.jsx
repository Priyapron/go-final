import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserPopup from './AddUserPopup';
import { Link } from 'react-router-dom';
import './UserManagement.css';



const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false);
  const [addUserStatus, setAddUserStatus] = useState(null);

  useEffect(() => {
    // Fetch all users
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [addUserStatus]); // Add addUserStatus as a dependency

  const searchUsers = () => {
    // Search users by name or email
    axios.get(`http://localhost:5000/users?query=${searchQuery}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error searching users:', error));
  };

  const handleDelete = async (email) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        // Delete user by email
        await axios.delete(`http://localhost:5000/users/${email}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.Email !== email));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleAddUser = (newUserData) => {
    axios.post('http://localhost:5000/users', newUserData)
      .then(response => {
        console.log('New user data:', response.data);
        setAddUserStatus('success');
        // Close the add user popup if needed
        setIsAddUserPopupOpen(false);
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setAddUserStatus('failure');
      });
  };

  const openAddUserPopup = () => {
    setIsAddUserPopupOpen(true);
  };

  const closeAddUserPopup = () => {
    setIsAddUserPopupOpen(false);
  };

  useEffect(() => {
    // Reset the addUserStatus after a short delay
    if (addUserStatus) {
      const timeout = setTimeout(() => {
        setAddUserStatus(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [addUserStatus]);

  return (
    
    <div className="user-management-container">
      <h2>User Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchUsers}>Search</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Profile}</td>
              <td>
                <Link to={`/editUser/${user.Email}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(user.Email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button className="add-button" onClick={openAddUserPopup}>
        Add User
      </button>

      {isAddUserPopupOpen && (
        <AddUserPopup onClose={closeAddUserPopup} onAddUser={handleAddUser} />
      )}

      {addUserStatus === 'success' && (
        <div className="success-message">User added successfully!</div>
      )}

      {addUserStatus === 'failure' && (
        <div className="error-message">Failed to add user. Please try again.</div>
      )}
    </div>
  );
};

export default UserManagement;
