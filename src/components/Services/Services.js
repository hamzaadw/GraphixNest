import React, { useEffect } from "react";
import "./Services.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const services = [
    "Logo Design",
    "Social Media Posts",
    "YouTube Thumbnails",
    "Stream Overlays",
    "Business Card Design",
  ];

  return (
    <section className="services" id="services">
      <h2>Services</h2>
      <div className="service-list">
        {services.map((service, index) => (
          <div key={index} className="service-item" data-aos="zoom-in-up">
            {service}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
