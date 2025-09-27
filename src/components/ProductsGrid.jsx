import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getDocs,
} from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductModal from "./ProductModal";
import "../styles/ProductsGrid.css";

const fetchProducts = async ({ category, lastDoc }) => {
  const productsRef = collection(db, "products");
  let q = query(productsRef, orderBy("createdAt", "desc"), limit(8));

  if (category !== "all") {
    q = query(
      productsRef,
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(8)
    );
  }

  if (lastDoc) q = query(q, startAfter(lastDoc));

  const snapshot = await getDocs(q);

  return {
    products: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    isLastPage: snapshot.docs.length < 8,
  };
};

export default function ProductsGrid() {
  const [category, setCategory] = useState("all");
  const [pageStack, setPageStack] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", category, pageStack.length],
    queryFn: () =>
      fetchProducts({
        category,
        lastDoc: pageStack[pageStack.length - 1] || null,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
  });

  const handleNext = () => data?.lastDoc && setPageStack((prev) => [...prev, data.lastDoc]);
  const handlePrev = () => pageStack.length > 0 && setPageStack((prev) => prev.slice(0, -1));
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPageStack([]);
    queryClient.removeQueries({ queryKey: ["products", cat] });
    refetch();
  };

useEffect(() => {
  // Only scroll when pageStack is not empty
  if (pageStack.length > 0) {
    const element = document.getElementById("products");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}, [pageStack]);


  if (isLoading)
    return (
      <div id="products" className="products-section">

      <div className="loading">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      </div>
    );

  if (isError) return <p className="public-empty">Error loading products</p>;

  return (
    <div id="products" className="products-section">
    <section className="public-products-container">
      {/* Filters */}
      <div className="public-filters">
        {["all", "cake", "service", "other"].map((cat) => (
          <button
            key={cat}
            className={`public-filter-btn ${category === cat ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="public-products-grid">
        {data?.products?.length > 0 ? (
          data.products.map((product) => (
            <div className="public-product-card" key={product.id}>
              <div
                className="public-product-bg"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              />
              <div className="public-product-overlay">
                <div className="public-product-info">
                  <div className="public-title-category">
                    <h3 className="public-product-title">{product.name}</h3>
                    <span className="public-product-category">{product.category}</span>
                  </div>

                  <p className="public-product-price">{product.price} DZD</p>
                </div>
                <button
                  className="public-product-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  View
                </button>
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
          className={`public-pagination-btn ${pageStack.length === 0 ? "disabled" : ""}`}
          disabled={pageStack.length === 0}
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className={`public-pagination-btn ${data?.isLastPage ? "disabled" : ""}`}
          disabled={data?.isLastPage}
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
    </div>
  );
}
