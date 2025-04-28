import React, { useState } from 'react';

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
  const [limitId, setLimitId] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const isCounterpartyFilled = counterparty.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCounterpartyFilled && limitId && limitAmount) {
      const entry = { searchType, counterparty, limitId, limitAmount, date: new Date().toLocaleString() };
      setHistory([entry, ...history]);
      onSubmit && onSubmit({ searchType, counterparty, limitId, limitAmount });
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#222', alignItems: 'center', justifyContent: 'center' }}>
      <div style={sidebarStyle}>
        <div style={iconStyle} title="Search" onClick={() => setShowHistory(false)}>🔍</div>
        <div style={{ ...iconStyle, background: '#b2d6e6', border: '2px solid #1e90ff' }} title="History" onClick={() => setShowHistory(true)}>📑</div>
      </div>
      {showHistory ? (
        <div style={{ background: '#e6e6e6', borderRadius: '2rem', padding: '2rem', minWidth: 350, minHeight: 350, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowY: 'auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'monospace', color: '#1e90ff' }}>History</h2>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', fontFamily: 'monospace' }}>No history yet.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {history.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '1.2rem', borderBottom: '1px solid #ccc', paddingBottom: '0.7rem' }}>
                  <div style={{ fontFamily: 'monospace', color: '#333' }}>
                    <b>{item.searchType === 'name' ? 'Name' : 'ID'}:</b> {item.counterparty}<br />
                    <b>Limit ID:</b> {item.limitId}<br />
                    <b>Limit Amount:</b> {item.limitAmount}<br />
                    <span style={{ fontSize: '0.8em', color: '#888' }}>{item.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#e6e6e6', borderRadius: '2rem', padding: '2rem', minWidth: 350, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'monospace', color: '#2e8b57' }}>Limit Adjusting Screen</h2>
          <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
            <select value={searchType} onChange={e => setSearchType(e.target.value)} style={{ fontFamily: 'monospace', border: '1px solid #2e8b57', borderRadius: '0.5rem', padding: '0.4rem', marginRight: 8 }}>
              <option value="name">Name</option>
              <option value="id">ID</option>
            </select>
            <input
              type="text"
              placeholder={searchType === 'name' ? 'Counterparty Name' : 'Counterparty ID'}
              value={counterparty}
              onChange={e => setCounterparty(e.target.value)}
              style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #2e8b57', fontFamily: 'monospace' }}
            />
          </div>
          <input
            type="text"
            placeholder="Limit id"
            value={limitId}
            onChange={e => setLimitId(e.target.value)}
            disabled={!isCounterpartyFilled}
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace', background: !isCounterpartyFilled ? '#f5f5f5' : undefined }}
          />
          <input
            type="number"
            placeholder="Limit_amount"
            value={limitAmount}
            onChange={e => setLimitAmount(e.target.value)}
            disabled={!isCounterpartyFilled}
            style={{ width: '100%', marginBottom: '1.5rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a86b00', fontFamily: 'monospace', background: !isCounterpartyFilled ? '#f5f5f5' : undefined }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: '0.7rem', borderRadius: '0.7rem', border: '1.5px solid #2e8b57', background: isCounterpartyFilled && limitId && limitAmount ? '#2e8b57' : 'none', color: isCounterpartyFilled && limitId && limitAmount ? '#fff' : '#2e8b57', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '1.5rem', cursor: isCounterpartyFilled && limitId && limitAmount ? 'pointer' : 'not-allowed' }}
            disabled={!(isCounterpartyFilled && limitId && limitAmount)}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default LimitAdjustingScreen; 