import { useNavigate } from "react-router-dom";
import "../styles/Error404.css";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-overlay">
      <div className="error-content">

      <h1>Oh oh! little cake lost the frosting</h1>
      <p>Cookie knows a place..</p>
      <button onClick={() => navigate("/")} className="choco-btn">
        Back To Counter
      </button>
      </div>
      </div>
    </div>
  );
}
