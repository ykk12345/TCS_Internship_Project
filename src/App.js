import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import LimitAdjustingScreen from './LimitAdjustingScreen';
import LimitScreen from './LimitScreen';
import LimitApprovalScreen from './LimitApprovalScreen';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [limitScreenData, setLimitScreenData] = useState(null);
  const [showApprovalScreen, setShowApprovalScreen] = useState(false);

  const handleLimitSubmit = (data) => {
    setLimitScreenData({
      limitId: data.limitId,
      limitAmount: data.limitAmount,
      counterparty: data.counterparty,
      // Other fields can be filled by the user on the next screen
    });
  };

  const handleApprovalClick = (formData) => {
    setLimitScreenData(formData);
    setShowApprovalScreen(true);
  };

  if (showApprovalScreen && limitScreenData) {
    return (
      <LimitApprovalScreen 
        limitId={limitScreenData.limitId}
        limitName={limitScreenData.limitName}
        approver1={limitScreenData.approver1}
        approver2={limitScreenData.approver2}
      />
    );
  }

  if (limitScreenData) {
    return (
      <LimitScreen 
        limitId={limitScreenData.limitId} 
        limitAmount={limitScreenData.limitAmount} 
        counterparty={limitScreenData.counterparty}
        onApprovalClick={handleApprovalClick}
      />
    );
  }

  if (isLoggedIn) {
    return <LimitAdjustingScreen onSubmit={handleLimitSubmit} />;
  }

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#222', paddingTop: '3rem' }}>
      <h1 style={{ color: '#fff', textAlign: 'center', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Login and Sign Up Screen
      </h1>
      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Signup onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
