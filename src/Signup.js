import React from 'react';

const Signup = ({ onSwitch }) => {
  return (
    <div style={{ background: '#e6e6e6', borderRadius: '2rem', padding: '2rem', maxWidth: 350, margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'monospace', color: '#a86b00' }}>Sign Up</h2>
      <input type="text" placeholder="User_id" style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} />
      <input type="text" placeholder="user_name" style={{ width: '100%', marginBottom: '1.5rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace' }} />
      <button style={{ width: '100%', padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #a86b00', background: 'none', color: '#a86b00', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Sign Up</button>
      <div style={{ textAlign: 'center', color: '#a86b00', fontFamily: 'monospace', cursor: 'pointer' }} onClick={onSwitch}>
        existing user sign in
      </div>
    </div>
  );
};

export default Signup; 