import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserPopup from './AddUserPopup';
import { Link } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ setSearchResults] = useState([]);
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false);
  const [addUserStatus, setAddUserStatus] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleDelete = async (email) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
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
        setIsAddUserPopupOpen(false);
        fetchUsers(); // Fetch users again to update the list
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

  const filteredUsers = users.filter((user) => {
    return (
      user.ID.toString().includes(searchQuery) ||
      user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID, Name, or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchUsers}>Search</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((filteredUser) => (
            <tr key={filteredUser.ID}>
              
              <td>{filteredUser.Name}</td>
              <td>{filteredUser.Email}</td>
              <td>{filteredUser.Profile}</td>
              <td>
                <Link to={`/editUser/${filteredUser.Email}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(filteredUser.Email)}>
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
