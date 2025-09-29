import "../styles/Hero.css";


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

  <div className="hero-content">
    <h1>Welcome to Our Store</h1>
    <p className="description">
      A modern spot for treats, flavors, and everyday delights. Your sweet journey starts here.  
    </p>
    <button onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })} className="hero-button">Order Now</button>
  </div>

</div>

  );
}
