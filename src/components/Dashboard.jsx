import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Dashboard.css";

export default function Dashboard({ setView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="dashboard"><p>Loading products...</p></div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
      <h1 className="section-title">Dashboard</h1>
      <div className="dashboard-actions">
        <button className="basic-button" onClick={() => setView("create")} >+ create</button>        
      </div>
      </div>

      <h2 className="section-title">Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products yet...</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="preview-card">
              <div
                className="preview-bg"
                style={{ backgroundImage: `url(${p.imageUrl})` }}
              ></div>

              <div className="preview-overlay">
                <div className="preview-info">
                  <div className="info-header">
                    <div className="title-category">
                      <h3 className="preview-title">{p.name}</h3>
                      <span className="preview-price">{p.price} DA</span>
                    </div>
                    <span className="preview-category">{p.category}</span>
                  </div>

                  <p className="preview-description">{p.description}</p>
                </div>
                <button className="preview-btn">View</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
