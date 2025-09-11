import { useNavigate } from "react-router-dom";
import "../styles/Error404.css";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-content">
      <h1>Oh oh </h1>
      <p>You wondered way too far..</p>
      <button onClick={() => navigate("/")} className="choco-btn">
        BACK TO SAFETY
      </button>
      </div>
    </div>
  );
}
