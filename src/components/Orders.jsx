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
  doc,
  updateDoc,
  deleteDoc, 
} from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReceiptModal from "../components/ReceiptModal";    

import "../styles/Orders.css";

const fetchOrders = async ({ status, lastDoc }) => {
  const ordersRef = collection(db, "orders");
  let q = query(ordersRef, orderBy("createdAt", "desc"), limit(8));

  if (status !== "all") {
    q = query(
      ordersRef,
      where("status", "==", status),
      orderBy("createdAt", "desc"),
      limit(8)
    );
  }

  if (lastDoc) q = query(q, startAfter(lastDoc));

  const snapshot = await getDocs(q);

  return {
    orders: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    isLastPage: snapshot.docs.length < 8,
  };
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("all");
  const [pageStack, setPageStack] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders", status, pageStack.length],
    queryFn: () =>
      fetchOrders({
        status,
        lastDoc: pageStack[pageStack.length - 1] || null,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
  });

  const handleNext = () =>
    data?.lastDoc && setPageStack((prev) => [...prev, data.lastDoc]);
  const handlePrev = () =>
    pageStack.length > 0 && setPageStack((prev) => prev.slice(0, -1));
  const handleStatusChange = (st) => {
    setStatus(st);
    setPageStack([]);
    queryClient.removeQueries({ queryKey: ["orders", st] });
    refetch();
  };

  const updateStatus = async (orderId, newStatus) => {
    toast.info(
      <div className="confirm-toast">
        <p>
          Confirm status update to <b>{newStatus}</b>?
        </p>
        <div className="confirm-toast-buttons">
          <button
            className="yes-btn"
            onClick={async () => {
              try {
                await updateDoc(doc(db, "orders", orderId), {
                  status: newStatus,
                });
                toast.dismiss();
                toast.success("Status updated!");
                queryClient.invalidateQueries(["orders"]);
              } catch (err) {
                console.error(err);
                toast.error("Failed to update status");
              }
            }}
          >
            Yes
          </button>
          <button className="no-btn" onClick={() => toast.dismiss()}>
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleDelete = (orderId) => {
    toast.info(
      <div className="confirm-toast">
        <p>
          Are you sure you want to <b>delete this order</b>?
        </p>
        <div className="confirm-toast-buttons">
          <button
            className="yes-btn"
            onClick={async () => {
              try {
                await deleteDoc(doc(db, "orders", orderId));
                toast.dismiss();
                toast.success("Order deleted!");
                queryClient.invalidateQueries(["orders"]);
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete order");
              }
            }}
          >
            Yes
          </button>
          <button className="no-btn" onClick={() => toast.dismiss()}>
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  useEffect(() => {
    if (pageStack.length > 0) {
      const element = document.getElementById("orders");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pageStack]);

  if (isLoading)
    return (
      <div id="orders" className="orders-section">
        <div className="loading">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );

  if (isError) return <p className="orders-empty">Error loading orders</p>;

  return (
    <div id="orders" className="orders-section">
      <section className="orders-container">
        <h2 className="section-title">Orders</h2>

        {/* Filters */}
        <div className="orders-filters">
          {["all", "pending", "confirmed", "complete"].map((st) => (
            <button
              key={st}
              className={`orders-filter-btn ${status === st ? "active" : ""}`}
              onClick={() => handleStatusChange(st)}
            >
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="orders-list">
          {data?.orders?.length > 0 ? (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Wilaya</th>
                  <th>Baladya</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
                {data.orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <button
                        className="order-link"
                        onClick={() => setSelectedOrder(order)}
                      >
                        #{order.id.slice(0, 6)}
                      </button>
                    </td>                    <td>{order.name}</td>
                    <td>
                      <a href={`tel:${order.phone}`} className="phone-link">
                        {order.phone}
                      </a>
                    </td>
                    <td>{order.wilaya}</td>
                    <td>{order.baladya}</td>
                    <td>{order.total} DZD</td>
                    <td>
                      <select
                        className={`status-select ${order.status}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="complete">Complete</option>
                      </select>
                    </td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : ""}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="orders-empty">No orders found</p>
          )}
        </div>

        {/* Pagination */}
        <div className="orders-pagination">
          <button
            className={`orders-pagination-btn ${
              pageStack.length === 0 ? "disabled" : ""
            }`}
            disabled={pageStack.length === 0}
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className={`orders-pagination-btn ${
              data?.isLastPage ? "disabled" : ""
            }`}
            disabled={data?.isLastPage}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
            <ReceiptModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />

    </div>
  );
}
