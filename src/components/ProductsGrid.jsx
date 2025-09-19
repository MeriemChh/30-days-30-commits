import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
} from "firebase/firestore";
import "../styles/ProductsGrid.css";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [pageStack, setPageStack] = useState([]); 
  const [lastDoc, setLastDoc] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const productsRef = collection(db, "products");

  const fetchProducts = async (direction = "initial") => {
    let q = query(productsRef, orderBy("createdAt", "desc"), limit(8));

    if (category !== "all") {
      q = query(
        productsRef,
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(8)
      );
    }

    if (direction === "next" && lastDoc) {
      q = query(q, startAfter(lastDoc));
    } else if (direction === "prev" && pageStack.length > 0) {
      const prevStack = [...pageStack];
      const prevDoc = prevStack.pop(); 
      setPageStack(prevStack);
      q = query(q, startAfter(prevDoc));
    }

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(newLastDoc);

      if (direction === "next") {
        setPageStack((prev) => [...prev, lastDoc]);
      }

  
      setIsLastPage(snapshot.docs.length < 8);
    } else {
      setProducts([]);
      setIsLastPage(true);
    }
  };

  useEffect(() => {
    setProducts([]);
    setLastDoc(null);
    setPageStack([]);
    setIsLastPage(false);
    fetchProducts("initial");
  }, [category]);

  return (
    <section className="public-products-container">
      {/* Filters */}
      <div className="public-filters">
        {["all", "cake", "service", "other"].map((cat) => (
          <button
            key={cat}
            className={`public-filter-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="public-products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="public-product-card" key={product.id}>
              <div
                className="public-product-bg"
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
              />
              <div className="public-product-overlay">
                <div className="public-product-info">
                  <div className="public-title-category">
                    <h3 className="public-product-title">{product.name}</h3>
                    <span className="public-product-category">
                      {product.category}
                    </span>
                  </div>
                  <p className="public-product-description">
                    {product.description || "No description"}
                  </p>
                  <p className="public-product-price">{product.price} DZD</p>
                </div>
                <button className="public-product-btn">View</button>
              </div>
            </div>
          ))
        ) : (
          <p className="public-empty">No products found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="public-pagination">
        <button
          className={`public-pagination-btn ${
            pageStack.length === 0 ? "disabled" : ""
          }`}
          disabled={pageStack.length === 0}
          onClick={() => fetchProducts("prev")}
        >
          Prev
        </button>
        <button
          className={`public-pagination-btn ${isLastPage ? "disabled" : ""}`}
          disabled={isLastPage}
          onClick={() => fetchProducts("next")}
        >
          Next 
        </button>
      </div>
    </section>
  );
}
