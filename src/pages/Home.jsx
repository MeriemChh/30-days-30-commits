import Hero from "../components/Hero";
import Header from "../components/Header";
import Latest from "../components/Latest";                        
import "../styles/Home.css";
import AboutUs from "../components/AboutUs";    


export default function Home() {
  return (
    <div className="home">
      <Header />
      <Hero />
      <Latest />
      <AboutUs/>
    </div>
  );
}
