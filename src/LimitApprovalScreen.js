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

const buttonStyle = {
  padding: '0.7rem 2rem',
  borderRadius: '0.7rem',
  border: 'none',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  fontSize: '1.2rem',
  cursor: 'pointer',
  marginRight: '1rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
};

const LimitApprovalScreen = ({
  limitId = '',
  limitName = '',
  approver1 = '',
  approver2 = '',
}) => {
  const [formData, setFormData] = useState({
    limitId,
    limitName,
    approver1,
    approver2,
    currentApprover: '',
    approvalStatus: 0,
    loanStatus: '',
    comments: '',
    approvalDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApprove = () => {
    if (formData.currentApprover === '') {
      alert('Please enter the current approver name');
      return;
    }

    if (formData.approvalStatus === 0) {
      setFormData(prev => ({
        ...prev,
        approvalStatus: 1,
        loanStatus: 'Approved by one assignee'
      }));
    } else if (formData.approvalStatus === 1) {
      setFormData(prev => ({
        ...prev,
        approvalStatus: 2,
        loanStatus: 'Approved by both assignees'
      }));
    }
  };

  const handleReject = () => {
    if (formData.currentApprover === '') {
      alert('Please enter the current approver name');
      return;
    }
    setFormData(prev => ({
      ...prev,
      loanStatus: 'Loan rejected',
      approvalStatus: 0
    }));
  };

  const handleInapproval = () => {
    if (formData.currentApprover === '') {
      alert('Please enter the current approver name');
      return;
    }
    setFormData(prev => ({
      ...prev,
      loanStatus: 'Loan put for inapproval process',
      approvalStatus: 0
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', paddingTop: '2rem' }}>
      <h2 style={{ color: '#a86b00', fontFamily: 'monospace', marginLeft: '2rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '2.2rem' }}>Limit Approval Screen</h2>
      <div style={cardStyle}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Limit ID</label>
          <input 
            style={fieldStyle} 
            name="limitId"
            value={formData.limitId}
            onChange={handleInputChange}
            placeholder="Enter Limit ID"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Limit Name</label>
          <input 
            style={fieldStyle} 
            name="limitName"
            value={formData.limitName}
            onChange={handleInputChange}
            placeholder="Enter Limit Name"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Current Approver</label>
          <input 
            style={fieldStyle} 
            name="currentApprover"
            value={formData.currentApprover}
            onChange={handleInputChange}
            placeholder="Enter approver name"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Approval Date</label>
          <input 
            style={fieldStyle} 
            type="date"
            name="approvalDate"
            value={formData.approvalDate}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Approval Status</label>
          <input 
            style={fieldStyle} 
            value={formData.approvalStatus} 
            readOnly 
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Loan Status</label>
          <input 
            style={fieldStyle} 
            value={formData.loanStatus} 
            readOnly 
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Comments</label>
          <textarea 
            style={{ ...fieldStyle, minHeight: '100px', resize: 'vertical' }}
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            placeholder="Enter any comments about the approval decision"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button 
            onClick={handleApprove}
            style={{ ...buttonStyle, background: '#28a745', color: '#fff' }}
          >
            Approve
          </button>
          <button 
            onClick={handleReject}
            style={{ ...buttonStyle, background: '#dc3545', color: '#fff' }}
          >
            Reject
          </button>
          <button 
            onClick={handleInapproval}
            style={{ ...buttonStyle, background: '#ffc107', color: '#000' }}
          >
            Put for Inapproval
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitApprovalScreen; 