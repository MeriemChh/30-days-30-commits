import "../styles/Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";


export default function Header() {
  return (
    <div className="header">
        <div className="header-content">

        <div className="nav">
            <ul className="navbar">
         
                <li>Home</li>
                <li>about</li>
                <li>contact</li>
            </ul>

            <div className="menu">
              <FiMenu size={24} />
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
  );
}