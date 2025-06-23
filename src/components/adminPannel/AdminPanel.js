import React, { useState } from 'react';
import AdminPage from './AdminPage';

export default function AdminPanel() {
  const pass = '122';
  const [access, setAccess] = useState(false);
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === pass) {
      setAccess(true);
    } else {
      alert('Incorrect code!');
    }
  };

  if (!access) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Enter Admin Access Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
          />
          <button type="submit">Done</button>
        </form>
      </div>
    );
  }

  return <AdminPage />;
}
