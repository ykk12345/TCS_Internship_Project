import React, { useState } from 'react';

const Login = ({ onSwitch, onLogin }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/users/search?userId=${encodeURIComponent(userId)}&userName=${encodeURIComponent(userName)}`);

      if (response.ok) {
        const user = await response.json();
        console.log('User found:', user);
        setError('');
        onLogin(user);  // Call parent function with user data
      } else if (response.status === 404) {
        setError('User does not exist. Please check your ID and name.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please check your connection.');
    }
  };

  return (
    <div style={{ background: '#e6e6e6', borderRadius: '2rem', padding: '2rem', maxWidth: 350, margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'monospace', color: '#a86b00' }}>Login</h2>
      
      <input 
        type="text" 
        placeholder="User_id" 
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} 
      />
      
      <input 
        type="text" 
        placeholder="user_name" 
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ width: '100%', marginBottom: '1.5rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} 
      />
      
      {error && (
        <div style={{ color: 'red', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <button 
        style={{ width: '100%', padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #a86b00', background: 'none', color: '#a86b00', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '1.5rem' }} 
        onClick={handleLogin}
      >
        Login
      </button>

      <div 
        style={{ textAlign: 'center', color: '#a86b00', fontFamily: 'monospace', cursor: 'pointer' }} 
        onClick={onSwitch}
      >
        New user registration
      </div>
    </div>
  );
};

export default Login;
