// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import LimitAdjustingScreen from './LimitAdjustingScreen';
import LimitScreen from './LimitScreen';
import LimitApprovalScreen from './LimitApprovalScreen';
import { LimitProvider } from './LimitContext';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [limitScreenData, setLimitScreenData] = useState(null);
  const [showApprovalScreen, setShowApprovalScreen] = useState(false);

  const handleLimitSubmit = (data) => {
    setLimitScreenData({
      limitId: data.limitId,
      limitName: data.limitName,
      limitAmount: data.limitAmount,
      counterparty: data.counterparty,
    });
  };

  const handleApprovalClick = (formData) => {
    setLimitScreenData(formData);
    setShowApprovalScreen(true);
  };

  return (
    <LimitProvider>
      <div className="App" style={{ minHeight: '100vh', background: '#222', paddingTop: '3rem' }}>
        {showApprovalScreen && limitScreenData ? (
          <LimitApprovalScreen 
            limitId={limitScreenData.limitId}
            limitName={limitScreenData.limitName}
            approver1={limitScreenData.approver1}
            approver2={limitScreenData.approver2}
          />
        ) : limitScreenData ? (
          <LimitScreen 
            limitId={limitScreenData.limitId} 
            limitName={limitScreenData.limitName}
            limitAmount={limitScreenData.limitAmount} 
            counterparty={limitScreenData.counterparty}
            onApprovalClick={handleApprovalClick}
          />
        ) : isLoggedIn ? (
          <LimitAdjustingScreen onSubmit={handleLimitSubmit} />
        ) : (
          <>
            <h1 style={{ color: '#fff', textAlign: 'center', fontFamily: 'monospace', marginBottom: '2rem' }}>
              Login and Sign Up Screen
            </h1>
            {showLogin ? (
              <Login onSwitch={() => setShowLogin(false)} onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <Signup onSwitch={() => setShowLogin(true)} />
            )}
          </>
        )}
      </div>
    </LimitProvider>
  );
}

export default App;