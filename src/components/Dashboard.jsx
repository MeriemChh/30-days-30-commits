import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";


export default function Dashboard({ setView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    {/* */}
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


const handleDelete = async (id, name) => {
  toast.info(
    ({ closeToast }) => (
      <div className="confirm-toast">
        <p>Delete "{name}"?</p>
        <div className="confirm-toast-buttons">
          <button
            className="yes-btn"
            onClick={async () => {
              try {
                await deleteDoc(doc(db, "products", id));
                setProducts((prev) => prev.filter((p) => p.id !== id));
                toast.success("Product deleted successfully");
              } catch (err) {
                console.error("Error deleting product:", err);
                toast.error("Failed to delete product");
              }
              closeToast();
            }}
          >
            Yes
          </button>
          <button className="no-btn" onClick={closeToast}>
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
}

  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="section-title">Dashboard</h1>
        <div className="dashboard-actions">
          <button className="basic-button" onClick={() => setView("create")}>
            + create
          </button>
        </div>
      </div>

      <h2 className="section-title">Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products yet...</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <div
                className="product-card-image"
                style={{ backgroundImage: `url(${p.imageUrl})` }}
              ></div>

              <div className="product-card-content">
                <div className="product-card-header">
                  <h3 className="product-card-title">{p.name}</h3>
                  <span className="product-card-category">{p.category}</span>

                </div>
                  <span className="product-card-price">{p.price} DA</span>
                <p className="product-card-description">{p.description}</p>

                <div className="product-card-actions">
                  <button className="product-btn edit-btn">Edit</button>
                  <button className="product-btn delete-btn" onClick={() => handleDelete(p.id, p.name)} >Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>



<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={true}
  newestOnTop={true}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>


    </div>
  );
}
