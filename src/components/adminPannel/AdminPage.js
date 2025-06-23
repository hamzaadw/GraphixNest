import React, { useState } from 'react';
import Admin from './Admin';
import Categories from './Allitem';

export default function AdminPage() {
  const [activePage, setActivePage] = useState('add'); // default is 'add'

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ccc'
      }}>
        <button
          onClick={() => setActivePage('add')}
          style={{
            textDecoration: 'none',
            color: '#333',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Items
        </button>
        <button
          onClick={() => setActivePage('all')}
          style={{
            textDecoration: 'none',
            color: '#333',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          All Items
        </button>
      </div>

      <div style={{ padding: '20px' }}>
        {activePage === 'add' && <Admin />}
        {activePage === 'all' && <Categories />}
      </div>
    </div>
  );
}
