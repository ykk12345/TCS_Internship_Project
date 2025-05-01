import React, { useState } from 'react';

// Sample counterparty data
const COUNTERPARTY_DATA = {
  'Tata': [
    { id: 'TATA001', name: 'Tata Sons' },
    { id: 'TATA002', name: 'Tata Consultancy' },
    { id: 'TATA003', name: 'Tata Advanced Solutions' },
    { id: 'TATA004', name: 'Tata Motors' },
    { id: 'TATA005', name: 'Tata Steel' }
  ],
  'Reliance': [
    { id: 'REL001', name: 'Reliance Industries' },
    { id: 'REL002', name: 'Reliance Retail' },
    { id: 'REL003', name: 'Reliance Jio' }
  ]
};

const sidebarStyle = {
  width: 60,
  background: '#e6e6e6',
  borderRadius: '2rem 0 0 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem 0',
  marginRight: 20,
  boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
};

const iconStyle = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: '#b2e6b2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 24,
  fontSize: 20,
  cursor: 'pointer',
  border: '2px solid #2e8b57'
};

const LimitAdjustingScreen = ({ onSubmit }) => {
  const [searchType, setSearchType] = useState('name');
  const [counterparty, setCounterparty] = useState('');
  const [showBranches, setShowBranches] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [showLimitForm, setShowLimitForm] = useState(false);
  const [limitAmount, setLimitAmount] = useState('');
  const [limitName, setLimitName] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = () => {
    if (counterparty.trim().length > 0) {
      setShowBranches(true);
      setSelectedBranches([]);
      setShowLimitForm(false);
    }
  };

  const handleCounterpartyChange = (e) => {
    const value = e.target.value;
    setCounterparty(value);
    setShowBranches(false);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranches(prev => {
      const exists = prev.find(b => b.id === branch.id);
      if (exists) {
        return prev.filter(b => b.id !== branch.id);
      }
      return [...prev, branch];
    });
  };

  const handleCreateLimit = () => {
    if (selectedBranches.length > 0 && limitAmount && limitName) {
      const entry = {
        branches: selectedBranches,
        limitAmount,
        limitName,
        date: new Date().toLocaleString()
      };
      setHistory([entry, ...history]);
      onSubmit && onSubmit(entry);
    }
  };

  const handleLimitAmountChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0 && !value.includes('-') && !value.includes('.'))) {
      setLimitAmount(value);
    }
  };

  const filteredBranches = Object.entries(COUNTERPARTY_DATA)
    .filter(([key]) => key.toLowerCase().includes(counterparty.toLowerCase()))
    .flatMap(([_, branches]) => branches);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#222' }}>
      {/* Left Sidebar */}
      <div style={{ 
        width: '30%', 
        background: '#e6e6e6', 
        padding: '3rem', 
        borderRight: '1px solid #ccc',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '3rem',
          gap: '1rem'
        }}>
          <h3 style={{ 
            fontFamily: 'monospace', 
            color: '#2e8b57', 
            margin: 0,
            fontSize: '1.5rem'
          }}>Limit Creating Screen</h3>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <select 
            value={searchType} 
            onChange={e => setSearchType(e.target.value)}
            style={{ 
              padding: '0.8rem', 
              borderRadius: '0.5rem', 
              border: '1px solid #2e8b57', 
              fontFamily: 'monospace',
              fontSize: '1rem',
              width: '100%',
              backgroundColor: 'white'
            }}
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
          </select>
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'stretch'
          }}>
            <input
              type="text"
              placeholder={searchType === 'name' ? 'Enter counterparty name' : 'Enter counterparty ID'}
              value={counterparty}
              onChange={handleCounterpartyChange}
              style={{ 
                flex: 1,
                padding: '0.8rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #2e8b57', 
                fontFamily: 'monospace',
                fontSize: '1rem',
                backgroundColor: 'white',
                height: '45px',
                boxSizing: 'border-box'
              }}
            />
            <div
              onClick={handleSearch}
              style={{
                cursor: 'pointer',
                color: '#2e8b57',
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45px',
                height: '45px',
                borderRadius: '0.5rem',
                border: '1px solid #2e8b57',
                background: 'white',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                ':hover': {
                  background: '#2e8b57',
                  color: 'white'
                }
              }}
            >
              🔍
            </div>
          </div>
        </div>

        {showBranches && (
          <div style={{ 
            maxHeight: '500px', 
            overflowY: 'auto',
            transition: 'all 0.3s ease',
            opacity: showBranches ? 1 : 0,
            transform: showBranches ? 'translateY(0)' : 'translateY(-10px)',
            padding: '1rem',
            background: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ 
              fontFamily: 'monospace', 
              color: '#2e8b57', 
              marginBottom: '1.5rem',
              fontSize: '1.2rem'
            }}>Select Branches</h4>
            {filteredBranches.map(branch => (
              <div key={branch.id} style={{ 
                marginBottom: '1rem',
                transition: 'all 0.2s ease'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  padding: '0.8rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    background: '#f0f0f0'
                  }
                }}>
                  <input
                    type="checkbox"
                    checked={selectedBranches.some(b => b.id === branch.id)}
                    onChange={() => handleBranchSelect(branch)}
                    style={{
                      width: '18px',
                      height: '18px'
                    }}
                  />
                  {branch.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ 
        width: '70%', 
        padding: '3rem',
        transition: 'all 0.3s ease'
      }}>
        {selectedBranches.length > 0 && !showHistory && (
          <div style={{ 
            background: '#e6e6e6', 
            borderRadius: '1rem', 
            padding: '2rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            transition: 'all 0.3s ease',
            opacity: 1,
            transform: 'translateY(0)'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: '2rem', 
              fontFamily: 'monospace', 
              color: '#2e8b57' 
            }}>Create Limit</h2>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Limit Name"
                value={limitName}
                onChange={e => setLimitName(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #2e8b57', 
                  fontFamily: 'monospace', 
                  marginBottom: '1rem',
                  transition: 'all 0.2s ease'
                }}
              />
              <input
                type="number"
                placeholder="Limit Amount"
                value={limitAmount}
                onChange={handleLimitAmountChange}
                min="1"
                step="1"
                onKeyDown={(e) => {
                  // Prevent decimal point
                  if (e.key === '.') {
                    e.preventDefault();
                  }
                }}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #2e8b57', 
                  fontFamily: 'monospace', 
                  marginBottom: '1.5rem',
                  transition: 'all 0.2s ease'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleCreateLimit}
                  disabled={!limitName || !limitAmount}
                  style={{
                    flex: 1,
                    padding: '0.7rem',
                    borderRadius: '0.7rem',
                    border: '1.5px solid #2e8b57',
                    background: limitName && limitAmount ? '#2e8b57' : 'none',
                    color: limitName && limitAmount ? '#fff' : '#2e8b57',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    cursor: limitName && limitAmount ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  Create Limit
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  style={{
                    flex: 1,
                    padding: '0.7rem',
                    borderRadius: '0.7rem',
                    border: '1.5px solid #1e90ff',
                    background: '#1e90ff',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  History
                </button>
              </div>
            </div>
          </div>
        )}

        {showHistory && (
          <div style={{ 
            background: '#e6e6e6', 
            borderRadius: '1rem', 
            padding: '2rem', 
            maxWidth: '800px', 
            margin: '0 auto',
            transition: 'all 0.3s ease',
            opacity: 1,
            transform: 'translateY(0)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontFamily: 'monospace', 
                color: '#2e8b57',
                margin: 0
              }}>History</h2>
              <button
                onClick={() => setShowHistory(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #2e8b57',
                  background: '#2e8b57',
                  color: 'white',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    background: '#3e9b67'
                  }
                }}
              >
                Back to Create Limit
              </button>
            </div>
            {history.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                color: '#888', 
                fontFamily: 'monospace' 
              }}>No history yet.</div>
            ) : (
              <div style={{ 
                maxHeight: '500px', 
                overflowY: 'auto',
                transition: 'all 0.3s ease'
              }}>
                {history.map((entry, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '1.5rem', 
                    padding: '1rem', 
                    border: '1px solid #ccc', 
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <div style={{ fontFamily: 'monospace', color: '#333' }}>
                      <h3 style={{ 
                        color: '#2e8b57', 
                        marginBottom: '0.5rem' 
                      }}>{entry.limitName}</h3>
                      <p><strong>Amount:</strong> {entry.limitAmount}</p>
                      <p><strong>Branches:</strong></p>
                      <ul style={{ marginLeft: '1.5rem' }}>
                        {entry.branches.map(branch => (
                          <li key={branch.id}>{branch.name}</li>
                        ))}
                      </ul>
                      <p style={{ 
                        fontSize: '0.8em', 
                        color: '#888', 
                        marginTop: '0.5rem' 
                      }}>{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LimitAdjustingScreen; 