import { useNavigate }  from 'react-router-dom';
import "../styles/Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { useState } from "react";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();


  return (

    <>
    <div className={`header ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="header-content">

        <div className="nav">
          <ul className="navbar">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li onClick={() =>  navigate("/admin")}>Login</li>

          </ul>

          <div className="menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>

        <div className="logo">
          <h6>logo</h6>
        </div>

        <div className="cart">
          <FaShoppingCart size={24} />
        </div>

      </div>


      </div>
        {/* Mobile Screen */}
        {isMobileMenuOpen && (
          <div className="nav-screen">
            <ul className="mobile-navbar">
              <li onClick={toggleMobileMenu}>Home</li>
              <li onClick={toggleMobileMenu}>Workshops</li>
              <li onClick={toggleMobileMenu}>About us</li>
              <li onClick={() =>  navigate("/admin")}>Login</li>
            </ul>
            <div className="socials">
              <FaInstagram size={20} className="socialmedia-icon" />
              <FaFacebook size={20} className="socialmedia-icon" />
              <FaTiktok size={20} className="socialmedia-icon" />


            </div>
          </div>

          
        )}

        {isMobileMenuOpen && (
          <div className="close" onClick={toggleMobileMenu}>
               <FiX size={24} />
          </div>

          
        )}

      </>
  );
}
