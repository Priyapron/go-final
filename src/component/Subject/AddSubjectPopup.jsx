// AddSubjectPopup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddSubjectPopup.css'; // Import the CSS file

const AddSubjectPopup = ({ onClose, onAddSubject }) => {
  const [newSubject, setNewSubject] = useState({
    Subject_id: '',
    Subject_name: '',
    Subject_credit: '',
  });

  const addSubject = async () => {
    try {
      const response = await axios.post('http://localhost:5000/subjects', {
        ...newSubject,
        Subject_credit: parseInt(newSubject.Subject_credit, 10), // Convert Subject_credit to number
      });
      onAddSubject(response.data);
      setNewSubject({
        Subject_id: '',
        Subject_name: '',
        Subject_credit: '',
      });
      onClose();
    } catch (error) {
      console.error('Error adding subject:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Add Subject</h2>
        <input
          type="text"
          placeholder="Subject ID"
          value={newSubject.Subject_id}
          onChange={(e) => setNewSubject({ ...newSubject, Subject_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject Name"
          value={newSubject.Subject_name}
          onChange={(e) => setNewSubject({ ...newSubject, Subject_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject Credit"
          value={newSubject.Subject_credit}
          onChange={(e) => setNewSubject({ ...newSubject, Subject_credit: e.target.value })}
        />
        <button className="primary" onClick={addSubject}>
          Add Subject
        </button>
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSubjectPopup;
