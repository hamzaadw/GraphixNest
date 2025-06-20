import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Portfolio from "./components/portfolie/Portfolio";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Logo from './screens/logo/logo';
import Thumbnail from './screens/Thumbnails/Thumbnail';
import Banner from './screens/Banner/Banner.js';
import Buss from './screens/Buss/Buss.js';
import SocialPost from './screens/SocialPost/SocialPost.js';
import Overlay from './screens/Overlay/Overlay.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin route */}
        <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/logos" element={<Logo />} />
          <Route path="/thumbnail" element={<Thumbnail />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/socialpost" element={<SocialPost />} />
          <Route path="/Business" element={<Buss />} />
          <Route path="/Overlay" element={<Overlay />} />

        {/* Main Website Route */}
        <Route path="/" element={
          <>
            <div className="App">
              <Hero />
              <Services />
              <Portfolio />
              <Contact />
              <Footer />
            </div>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
