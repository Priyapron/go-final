import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      const hashedPassword = await hashPassword(password); // Hash the password
      const response = await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        password: hashedPassword,
        profile,
      });
      console.log(response.data); // Handle registration success
      // Redirect the user or perform other actions upon successful registration
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.'); // Update the error state
    } finally {
      setLoading(false);
    }
  };

  // Function to hash the password
  const hashPassword = async (plainPassword) => {
    const response = await axios.post('http://localhost:5000/users/hashPassword', {
      password: plainPassword,
    });
    return response.data.hashedPassword;
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>
      <div style={styles.formGroup}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Profile:</label>
        <input
          type="text"
          placeholder="Your Profile"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <button onClick={handleRegister} disabled={loading} style={styles.submitButton}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '50px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Register;
