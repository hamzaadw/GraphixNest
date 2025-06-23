import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import AdminPage from './components/adminPannel/AdminPage.js';
import { FaHome } from 'react-icons/fa';
import './App.css';

const HomeIcon = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-icon" onClick={handleClick} title="Go to Home">
      <FaHome />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Home Icon shown on every page */}
        <HomeIcon />

        <Routes>
          {/* Admin routes */}

          {/* <Route path="/adminpanel" element={<AdminPanel />} /> */}
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/logos" element={<Logo />} />
          <Route path="/thumbnail" element={<Thumbnail />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/socialpost" element={<SocialPost />} />
          <Route path="/Business" element={<Buss />} />
          <Route path="/Overlay" element={<Overlay />} />


          

          {/* Main Website Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Portfolio />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
