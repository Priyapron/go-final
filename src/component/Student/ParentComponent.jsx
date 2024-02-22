// ParentComponent.jsx

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddStudent from './AddStudent';

const ParentComponent = () => {
  const handleAddStudent = (newStudentData) => {
    // Logic to handle adding a student, e.g., updating state or making API calls
    console.log('New student data:', newStudentData);
  };

  return (
    <Router>
      <div>
        {/* Other components/routes */}
        <Route
          path="/addStudent"
          render={(props) => (
            <AddStudent onAddStudent={handleAddStudent} history={props.history} />
          )}
        />
        {/* Other components/routes */}
      </div>
    </Router>
  );
};

export default ParentComponent;
