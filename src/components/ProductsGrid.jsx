import { useEffect, useState } from "react";
import { db } from "../firebase"; 
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
} from "firebase/firestore";
import "../styles/ProductsGrid.css";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [pageCursors, setPageCursors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 8;


  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPage = async (page, direction) => {
    setLoading(true);

    try {
      const productsRef = collection(db, "products");
      let q;

      if (page === 1) {
        q = query(productsRef, orderBy("createdAt", "desc"), limit(productsPerPage));
      } else if (direction === "next") {
        const lastVisible = pageCursors[page - 2]; 
        q = query(
          productsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(productsPerPage)
        );
      } else if (direction === "prev") {
        const firstVisible = pageCursors[page]; 
        q = query(
          productsRef,
          orderBy("createdAt", "desc"),
          endBefore(firstVisible),
          limit(productsPerPage)
        );
      }

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(items);

      if (snapshot.docs.length > 0) {
        const cursors = [...pageCursors];
        cursors[page - 1] = snapshot.docs[snapshot.docs.length - 1]; 
        setPageCursors(cursors);
      }

      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching products:", err);
    }

    setLoading(false);
  };

  return (
    <div className="products-grid">
      {loading && <p>Loading...</p>}

      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.imageUrl || "./placeholder.png"}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.price} DZD</p>
          </div>
        ))}
      </div>


      <div className="pagination">
        <button
          onClick={() => fetchPage(currentPage - 1, "prev")}
          disabled={currentPage === 1 || loading}
        >
          Prev
        </button>

        <span>Page {currentPage}</span>

        <button
          onClick={() => fetchPage(currentPage + 1, "next")}
          disabled={products.length < productsPerPage || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
