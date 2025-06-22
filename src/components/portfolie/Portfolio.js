import React from "react";
import "./Portfolio.css";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Portfolio = () => {
  const items = [
    { path: "/logos", text: "Logo+Design", label: "Creative Logo Design", bg: "333" },
    { path: "/socialpost", text: "Social+Post", label: "Social Media Graphics", bg: "333" },
    { path: "/thumbnail", text: "Thumbnail", label: "YouTube Thumbnails", bg: "333" },
    { path: "/overlay", text: "Overlay+Design", label: "Stream Overlay", bg: "333" },
    { path: "/Business", text: "Business+Card", label: "Business Card Design", bg: "333" },
    { path: "/banner", text: "Banner+Design", label: "Web Banner", bg: "333" },
  ];


  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // animation runs only once
    });
  }, []);



  return (
    <section className="portfolio" id="portfolio">
      <h2>Portfolio</h2>
      <div className="portfolio-grid">
        {items.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="portfolio-item"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <img
              src={`https://dummyimage.com/300x300/${item.bg}/fff&text=${item.text}`}
              alt={item.label}
            />
            <p>{item.label}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;