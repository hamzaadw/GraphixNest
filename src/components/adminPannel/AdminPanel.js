import React from 'react'
import { useState } from 'react'
import Admin from './Admin'

export default function AdminPanel() {

    const pass = '221'
    const [access, setaccess] = useState("")
    const [code, setcode] = useState("")

    const handleSubmit = (e) => {
    e.preventDefault();
    if (code === pass) {
      setaccess(true);
    } else {
      alert('Incorrect code!');
    }
  };

  if(!access){
    return(
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Enter Admin Access Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setcode(e.target.value)}
            placeholder="Access Code"
          />
          <button type="submit">Done</button>
        </form>
      </div>
    )
  }




  return (
    <div>

    <Admin/>
        





    </div>
  )
}
