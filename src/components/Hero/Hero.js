import React, { useEffect, useState } from "react";
import "./Hero.css";

import logo from "../../configrations/logo3.png";
import brush from "../../configrations/p-removebg-preview.png";
import Doodle from "../../configrations/ddd.png";

const Hero = () => {
  const phrases = ["Our Pixels", "Our Illustration"];
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 80 : 120;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);

      setDisplayText(updatedText);
      setCharIndex(isDeleting ? charIndex - 1 : charIndex + 1);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section id="home" className="hero">
      <img src={brush} alt="Brush Stroke" className="hero-brush" />
      <img src={Doodle} alt="Graphic Doodle" className="hero-doodle" />

      <div className="hero-logo-wrapper">
        <div className="logo-ring"></div>
        <img src={logo} alt="Grafentix Logo" className="hero-logo" />
      </div>

      <h2 className="hero-subheading">Design Beyond Imagination</h2>

      <p>
        Your Vision, <span className="typing">{displayText}</span>
        <span className="cursor"></span>
      </p>

      <a href="#portfolio" className="btn">View My Work</a>
    </section>
  );
};

export default Hero;
