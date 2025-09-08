import "../styles/Hero.css";


export default function Hero() {
  return (
<div className="hero">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="hero-video"
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>

  <div className="hero-content">
    <h1>30 Days, 30 Commits</h1>
  </div>
</div>

  );
}
