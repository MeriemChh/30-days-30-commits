import "../styles/ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="contactus">
      <h2>Contact Us</h2>
      <p>
        We’d love to hear from you! Get in touch for custom cakes, events, or
        questions.
      </p>

      <div className="contactus-info">
        <a className="contact-icon" href="tel:+213555555555">
          <FaPhoneAlt />
        </a>
        <a
          className="contact-icon"
          href="mailto:sweetdelights@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>
        <a
          className="contact-icon"
          href="https://instagram.com/sweetdelights"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>

      <a
        href="https://wa.me/213555555555"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp /> Message us on WhatsApp
      </a>
    </section>
  );
}
