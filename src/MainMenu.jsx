import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainMenu.css'; // Import the CSS file for styling

function MainMenu() {
  const location = useLocation();

  // Check if the current path is either '/' or '/register'
  const isLoginOrRegister = location.pathname === '/' || location.pathname === '/register';

  // Only display the Appbar if it's not on Login or Register pages
  if (isLoginOrRegister) {
    return null;
  }

  return (
    <div class="page-container">
  <div class="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/mainMenu">Home</Link>
          </li>
          <li>
            <Link to="/user">User Management</Link>
          </li>
          <li>
            <Link to="/student">Student Management</Link>
          </li>
          <li>
            <Link to="/subject">Subject Management</Link>
          </li>
          <li>
            <Link to="/teacher">Teacher Management</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}

export default MainMenu;
