import React, { useEffect, useState } from 'react';
import './Logo.css';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../configrations/Firebase';

function Logo() {
  const [logoImages, setLogoImages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'Projects'), where('category', '==', 'Logo'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logos = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.image) {
          logos.push(data.image); // Make sure your Firestore documents have an 'image' field
        }
      });
      setLogoImages(logos);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <>
    <h2 style={{ fontSize: '36px', color: '#2e7d32', fontFamily: `'Segoe UI', Roboto, sans-serif`, textAlign: 'center', marginBottom: '10px' }}>Logos</h2>
<p style={{ fontSize: '16px', color: '#555', fontFamily: `'Segoe UI', Roboto, sans-serif`, textAlign: 'center', marginBottom: '40px' }}>Memorable logo designs that reflect your brand identity.</p>

    <div className="logo-gallery">
      {logoImages.map((src, index) => (
        <div className="logo-card" key={index}>
          <img className='image' src={src} alt={`Logo ${index + 1}`} />
        </div>
      ))}
    </div>
  </>
  );
}

export default Logo;
