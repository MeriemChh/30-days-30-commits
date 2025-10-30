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
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";

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

export default function Dashboard({ setView }) {
  const [category, setCategory] = useState("all");
  const [pageStack, setPageStack] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-products", category, pageStack.length],
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
    queryClient.removeQueries({ queryKey: ["dashboard-products", cat] });
    refetch();
  };

  useEffect(() => {
    if (pageStack.length > 0) {
      const element = document.getElementById("dashboard");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pageStack]);

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
                  queryClient.invalidateQueries(["dashboard-products"]);
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
  };

  if (isLoading) {
    return (
      <div id="dashboard" className="dashboard">
        <div className="loading">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <p className="public-empty">Error loading products</p>;

  return (
    <div id="dashboard" className="dashboard">
      <div className="dashboard-header">
        <h1 className="section-title">Products</h1>
        <div className="dashboard-actions">
          <button className="basic-button" onClick={() => setView("create")}>
            + create
          </button>
        </div>
      </div>

      {/* Category Filters */}
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

      <div className="product-grid">
        {data?.products?.length === 0 ? (
          <p>No products yet...</p>
        ) : (
          data.products.map((p) => (
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
                  <button className="product-btn edit-btn" onClick={() => setView({ type: "edit", product: p })}>
                    Edit
                  </button>
                  <button
                    className="product-btn delete-btn"
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
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
