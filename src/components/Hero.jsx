import "../styles/Hero.css";
import { FaMapMarkerAlt } from "react-icons/fa";


export default function Hero() {
  return (
<div id="hero" className="hero">
  {/** */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="hero-video"
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>

    <div className="writing-content">
      <h2 className="title">Welcome to Masagran!</h2>
      <p>Sip, Smile, Repeat!</p>
      <div className="buttons">
<button 
  className="hero-button"
  onClick={() => window.open(
    "https://www.google.com/maps?q=Q25G+G44+Masagran+Alg%C3%A9rie+-+Coffee+%26+Brunch,+El+Biar&ftid=0x128fb300648247d9:0xba5ba946f9abfbc0&entry=gps&lucs=,47071704,47069508,47084304,94208457,94206604&g_ep=CAISDTYuMTAxLjMuNDE1NjAYACDXggMqLSw0NzA3MTcwNCw0NzA2OTUwOCw0NzA4NDMwNCw5NDIwODQ1Nyw5NDIwNjYwNEICRFo%3D&g_st=ic",
    "_blank",
    "noopener,noreferrer"
  )}
>
  Find Our Shop <FaMapMarkerAlt style={{ marginLeft: "8px" }} />
</button>
<a href="#products" className="hero-cta">
  EXPLORE OUR MENU
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#e3e3e3"
  >
    <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
  </svg>
</a>
      </div>

    </div>

</div>

  );
}
