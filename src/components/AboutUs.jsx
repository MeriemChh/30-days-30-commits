import { useNavigate } from "react-router-dom";
import "../styles/AboutUs.css";
import { FaBirthdayCake, FaIceCream, FaCookie, FaCoffee } from "react-icons/fa";
import { GiCakeSlice, GiCupcake, GiDonut, GiChocolateBar, GiStrawberry, GiCandyCanes } from "react-icons/gi";
import { MdBakeryDining } from "react-icons/md";
import ContactUs from "./ContactUs";    


export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <section className="aboutus">

      {/* Floating icons */}
      <FaBirthdayCake className="floating-icon cake-icon" />
      <FaCookie className="floating-icon cookie-icon" />
      <GiCakeSlice className="floating-icon slice-icon" />
      <GiCupcake className="floating-icon cupcake-icon" />
      <GiDonut className="floating-icon donut-icon" />
      <GiChocolateBar className="floating-icon chocolate-icon" />
      <MdBakeryDining className="floating-icon bakery-icon" />

      <div className="aboutus-container">
        <div className="aboutus-text">
          <h2>About Us</h2>
          <p>
            Welcome to <strong>----</strong>, your local cake shop
            where every dessert is baked with love. From custom birthday cakes to
            delicate pastries, we bring joy to your celebrations with flavors
            that feel like home.
          </p>
          <p>
            We also offer high-end wedding cakes, corporate event catering, and
            seasonal treats.
          </p>
          <button className="readmore-btn" onClick={() => navigate("/about")}>
            Read More
          </button>
        </div>
      </div>

      <ContactUs/>

    </section>
  );
}
