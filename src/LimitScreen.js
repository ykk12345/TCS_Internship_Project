import React, { useState } from 'react';

const cardStyle = {
  background: '#fff',
  borderRadius: '1.5rem',
  padding: '2.5rem',
  maxWidth: 900,
  margin: '2rem auto',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
};

const fieldStyle = {
  width: '100%',
  marginBottom: '1.2rem',
  padding: '0.7rem',
  borderRadius: '0.5rem',
  border: '1.5px solid #a86b00',
  fontFamily: 'monospace',
  fontSize: '1.1rem',
  background: '#f7f7f7',
  boxSizing: 'border-box',
};

const labelStyle = {
  color: '#a86b00',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  marginBottom: 4,
  display: 'block',
};

const rowStyle = { display: 'flex', gap: '2%', marginBottom: '1.2rem' };
const colStyle = { width: '49%' };

const LimitScreen = ({
  limitId = '',
  limitName = '',
  limitAmount = '',
  counterparty = '',
  product = '',
  startDate = '',
  maturityDate = '',
  approver1 = '',
  approver2 = '',
  onApprovalClick,
}) => {
  const [formData, setFormData] = useState({
    limitId: limitId,
    limitName: limitName,
    limitAmount: limitAmount,
    counterparty: counterparty,
    product: product,
    startDate: startDate,
    maturityDate: maturityDate,
    approver1: approver1,
    approver2: approver2,
    currency: 'USD',
    limitRatings: []
  });
  const [showRatingsDropdown, setShowRatingsDropdown] = useState(false);
  const ratings = ['AAA', 'AA+', 'AA', 'AA-', 'BBB', 'BB+', 'BB', 'BB-', 'B', 'C', 'default'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      limitRatings: prev.limitRatings.includes(rating)
        ? prev.limitRatings.filter(r => r !== rating)
        : [...prev.limitRatings, rating]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApprovalClick(formData);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', paddingTop: '2rem' }}>
      <h2 style={{ color: '#a86b00', fontFamily: 'monospace', marginLeft: '2rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '2.2rem' }}>Limit Screen</h2>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <div style={rowStyle}>
          <div style={colStyle}>
            <label style={labelStyle}>Limit_id</label>
            <input 
              style={fieldStyle} 
              name="limitId"
              value={formData.limitId}
              onChange={handleInputChange}
              placeholder="Enter Limit ID"
            />
          </div>
          <div style={colStyle}>
            <label style={labelStyle}>Limit_name</label>
            <input 
              style={fieldStyle} 
              name="limitName"
              value={formData.limitName}
              onChange={handleInputChange}
              placeholder="Enter Limit Name"
            />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={colStyle}>
            <label style={labelStyle}>Limit_Amount</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                style={{ ...fieldStyle, marginBottom: 0, flex: 1 }} 
                name="limitAmount"
                value={formData.limitAmount}
                onChange={handleInputChange}
                placeholder="Enter Limit Amount"
              />
              <select 
                value={formData.currency} 
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))} 
                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1.5px solid #a86b00', fontFamily: 'monospace', fontSize: '1.1rem', background: '#f7f7f7' }}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="JPY">JPY</option>
                <option value="CNY">CNY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>
          <div style={colStyle}>
            <label style={labelStyle}>Limit_rating</label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  ...fieldStyle,
                  background: '#f7f7f7',
                  cursor: 'pointer',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '2.5rem',
                }}
                onClick={() => setShowRatingsDropdown((v) => !v)}
              >
                {formData.limitRatings.length > 0 ? formData.limitRatings.join(', ') : 'Select rating(s)'}
                <span style={{ marginLeft: 'auto', color: '#a86b00', fontWeight: 'bold' }}>▼</span>
              </div>
              {showRatingsDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 10,
                    background: '#fff',
                    border: '1.5px solid #a86b00',
                    borderRadius: '0.5rem',
                    boxShadow: '0 2px 8px rgba(168,107,0,0.08)',
                    padding: '0.7rem',
                    minWidth: '200px',
                  }}
                >
                  {ratings.map((rating) => (
                    <label
                      key={rating}
                      style={{
                        fontFamily: 'monospace',
                        color: '#a86b00',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.limitRatings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                        style={{ accentColor: '#a86b00' }}
                      />
                      {rating}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={colStyle}>
            <label style={labelStyle}>CounterParty (Borrower)</label>
            <input 
              style={fieldStyle} 
              name="counterparty"
              value={formData.counterparty}
              onChange={handleInputChange}
              placeholder="Enter Counterparty"
            />
          </div>
          <div style={colStyle}>
            <label style={labelStyle}>Product (type of product)</label>
            <input 
              style={fieldStyle} 
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              placeholder="Enter Product"
            />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={colStyle}>
            <label style={labelStyle}>Start_date</label>
            <input 
              style={fieldStyle} 
              type="date" 
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div style={colStyle}>
            <label style={labelStyle}>Maturity_date</label>
            <input 
              style={fieldStyle} 
              type="date" 
              name="maturityDate"
              value={formData.maturityDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div style={{ marginTop: '2rem', marginBottom: '1rem', color: '#a86b00', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.1rem' }}>Approver panel</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '49%' }}>
          <input 
            style={fieldStyle} 
            name="approver1"
            value={formData.approver1}
            onChange={handleInputChange}
            placeholder="Enter Approver 1"
          />
          <input 
            style={fieldStyle} 
            name="approver2"
            value={formData.approver2}
            onChange={handleInputChange}
            placeholder="Enter Approver 2"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
          <button 
            type="submit" 
            style={{ 
              padding: '0.7rem 2rem', 
              borderRadius: '0.7rem', 
              border: '2px solid #28a745', 
              background: '#28a745', 
              color: '#fff', 
              fontWeight: 'bold', 
              fontFamily: 'monospace', 
              fontSize: '1.2rem', 
              cursor: 'pointer', 
              boxShadow: '0 2px 8px rgba(40,167,69,0.08)' 
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LimitScreen; 