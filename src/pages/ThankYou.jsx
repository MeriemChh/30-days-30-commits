import { useNavigate } from "react-router-dom";
import "../styles/ThankYou.css";
import { FaBirthdayCake, FaCookie } from "react-icons/fa";
import { GiCakeSlice, GiCupcake, GiDonut, GiChocolateBar } from "react-icons/gi";
import { MdBakeryDining } from "react-icons/md";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <section className="thankyou">
      <FaBirthdayCake className="floating-icon cake-icon" />
      <FaCookie className="floating-icon cookie-icon" />
      <GiCakeSlice className="floating-icon slice-icon" />
      <GiCupcake className="floating-icon cupcake-icon" />
      <GiDonut className="floating-icon donut-icon" />
      <GiChocolateBar className="floating-icon chocolate-icon" />
      <MdBakeryDining className="floating-icon bakery-icon" />

      <div className="thankyou-container">
        <div className="thankyou-text">
          <h2>Thank You!</h2>
          <p>
        Thank you for ordering from us! Your order has been received and is now being prepared with care. We’ll have your treats ready for you very soon.
          </p>
          <button className="backhome-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
