import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });

      console.log(response.data.message); // Successful login

      // Redirect to MainMenu.jsx or any other page
      window.location.href = '/mainMenu'; // Adjust the path as needed
    } catch (error) {
      console.error('Error during login:', error.response.data.error);
    }
  };

  const redirectToRegister = () => {
    // Redirect to the registration page
    window.location.href = '/register'; // Adjust the path as needed
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>Login</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      <button onClick={handleLogin} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Don't have an account? <span style={{ color: '#4caf50', cursor: 'pointer' }} onClick={redirectToRegister}>Register</span>
      </p>
    </div>
  );
};

export default Login;
