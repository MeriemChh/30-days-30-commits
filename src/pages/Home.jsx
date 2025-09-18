import Hero from "../components/Hero";
import Header from "../components/Header";
import Latest from "../components/Latest";                        
import "../styles/Home.css";
import AboutUs from "../components/AboutUs";    
import ContactUs from "../components/ContactUs";    
import Footer from "../components/Footer";
import ProductsGrid from "../components/ProductsGrid";


export default function Home() {
  return (
    <div className="home">
      <Header />
      <Hero />
      <ProductsGrid />
      <AboutUs/>
      <Footer/>
    </div>
  );
}
