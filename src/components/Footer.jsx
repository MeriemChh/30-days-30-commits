import "../styles/Footer.css";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">logo logo</h3>
        <p className="footer-tagline">
          Baked with love, served with joy
        </p>

        <div className="footer-socials">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://wa.me/213555555555" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sweet Delights. All rights reserved.</p>
        <a className="credit" href="https://meriem-chakhoum.vercel.app" target="_blank" rel="noopener noreferrer" > Designed & developed by Meriem Chakhoum</a>
      </div>
    </footer>
  );
}
