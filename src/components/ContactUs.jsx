import "../styles/ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section id="contact" className="contactus">
<h2>Contact Us</h2>
<p>
  We'd love to hear from you! Whether you’re planning a cozy brunch, 
  have a question about our menu, or just want to say hello — 
  the Masagran team is always happy to connect.
</p>

      <div className="contactus-info">
        <a className="contact-icon" href="tel:+213555555555">
          <FaPhoneAlt />
        </a>
        <a
          className="contact-icon"
          href="mailto:masagran@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>
        <a
          className="contact-icon"
          href="https://instagram.com/masagran.dz"
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
