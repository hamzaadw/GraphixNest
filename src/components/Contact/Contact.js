import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formElement = form.current;

    const emailToAdmin = emailjs.sendForm(
      "service_e91ajli",
      "template_o1m6qkm",
      formElement,
      "cqL9NZrzPp8gBSvCQ"
    );

    const emailToSender = emailjs.sendForm(
      "service_e91ajli",
      "template_y1zlmmw",
      formElement,
      "cqL9NZrzPp8gBSvCQ"
    );

    Promise.all([emailToAdmin, emailToSender])
      .then(() => {
        setIsLoading(false);
        form.current.reset();

        Swal.fire({
          title: "Message Sent!",
          text: "Your message has been successfully delivered.",
          icon: "success",
          confirmButtonColor: "#2e7d32",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("EmailJS Error:", error.text);

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <section className="contact-wrapper">
      {/* Decorative Circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="circle circle5"></div>

      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p className="contact-subtext">
          Have a question or project in mind? We'd love to hear from you.
        </p>

        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          />
          <input
            type="hidden"
            name="time"
            value={new Date().toLocaleString()}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? <ClipLoader size={20} color="#fff" /> : "Send Message"}
          </button>
        </form>

        <a
          href="https://wa.me/+923390084207"
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i> Chat on WhatsApp
        </a>
      </section>
    </section>
  );
};

export default Contact;
