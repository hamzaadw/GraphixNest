import React, { useEffect, useState } from 'react';
import './Overlay.css';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../configrations/Firebase';

function Overlay() {
  const [videoURLs, setVideoURLs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'Projects'), where('category', '==', 'Overlay'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const videos = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.image) {
          videos.push(data.image); // Assuming 'image' field holds video URL
        }
      });
      setVideoURLs(videos);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <>
    <h2 style={{ fontSize: '36px', color: '#2e7d32', fontFamily: `'Segoe UI', Roboto, sans-serif`, textAlign: 'center', marginBottom: '10px' }}>Stream Overlays</h2>
<p style={{ fontSize: '16px', color: '#555', fontFamily: `'Segoe UI', Roboto, sans-serif`, textAlign: 'center', marginBottom: '40px' }}>Dynamic overlay designs for live streaming & gameplay.</p>


    <div className="logo-gallery">
        
      {videoURLs.map((src, index) => (
        <div className="logo-card" key={index}>
          <video
            className="video-preview"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
    </>
  );
}

export default Overlay;
