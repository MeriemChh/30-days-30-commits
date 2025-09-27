import { useNavigate }  from 'react-router-dom';
import "../styles/Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { FaYoutube, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";     



export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, isCartOpen, toggleCart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li onClick={() => navigate("/admin")}>Login</li>
        </ul>


          <div className="menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>

        <div className="logo">
          <h6>logo</h6>
        </div>

        <div onClick={toggleCart} className="cart">
           <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </div>


      </div>


      </div>
        {/* Mobile Screen */}
        {isMobileMenuOpen && (
          <div className="nav-screen">
          <ul className="mobile-navbar">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li onClick={() => navigate("/admin")}>Login</li>
          </ul>

            <div className="socials">
              <FaYoutube size={20} className="socialmedia-icon" />
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
