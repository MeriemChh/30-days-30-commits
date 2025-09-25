import Hero from "../components/Hero";
import Header from "../components/Header";
import Latest from "../components/Latest";                        
import "../styles/Home.css";
import AboutUs from "../components/AboutUs";    
import ContactUs from "../components/ContactUs";    
import Footer from "../components/Footer";
import ProductsGrid from "../components/ProductsGrid";
import { CartProvider } from "../context/CartContext";
import Cart from "../components/Cart";        


export default function Home() {
  return (
    <div className="home">
      <CartProvider>
        <Header />
        <Cart />
        <Hero />
        <ProductsGrid />
      </CartProvider>
        <AboutUs/>
        <Footer/>
    </div>
  );
}
