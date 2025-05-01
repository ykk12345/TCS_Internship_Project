import React, { useState } from 'react';

const Signup = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    role: '',
    ratingBand: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Signup successful!');
        setFormData({ userId: '', userName: '', role: '', ratingBand: '' });
        onSwitch(); // navigate to login
      } else {
        alert('Signup failed. Try again.');
      }
    } catch (error) {
      alert('Error connecting to server.');
      console.error(error);
    }
  };

  return (
    <div style={{ background: '#e6e6e6', borderRadius: '2rem', padding: '2rem', maxWidth: 350, margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'monospace', color: '#a86b00' }}>Sign Up</h2>
      <input type="text" name="userId" placeholder="User Id" value={formData.userId} onChange={handleChange}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} />
      <input type="text" name="userName" placeholder="User Name" value={formData.userName} onChange={handleChange}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} />
      <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} />
      <input type="text" name="ratingBand" placeholder="Rating Band" value={formData.ratingBand} onChange={handleChange}
        style={{ width: '100%', marginBottom: '1.5rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} />
      
      <button style={{ width: '100%', padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #a86b00', background: 'none', color: '#a86b00', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '1.5rem' }}
        onClick={handleSubmit}>
        Sign Up
      </button>
      
      <div style={{ textAlign: 'center', color: '#a86b00', fontFamily: 'monospace', cursor: 'pointer' }} onClick={onSwitch}>
        existing user sign in
      </div>
    </div>
  );
};

export default Signup;
