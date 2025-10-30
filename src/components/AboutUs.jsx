import { useNavigate } from "react-router-dom";
import "../styles/AboutUs.css";
import { FaBirthdayCake, FaIceCream, FaCookie, FaCoffee } from "react-icons/fa";
import { GiCakeSlice, GiCupcake, GiDonut, GiChocolateBar, GiStrawberry, GiCandyCanes } from "react-icons/gi";
import { MdBakeryDining } from "react-icons/md";
import ContactUs from "./ContactUs";    


export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <section id="about" className="aboutus">

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
  Welcome to <strong>Masagran Coffee & Brunch</strong> — a warm corner where every sip and bite tells a story. 
  From freshly brewed coffee to handcrafted brunch plates and homemade desserts, 
  we serve comfort with a touch of elegance.
</p>
<p>
  Whether you're meeting friends, enjoying a quiet morning, or treating yourself to something sweet, 
  Masagran is your spot for moments that feel like home.
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
