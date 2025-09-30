import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/OrderManager.css";

export default function OrderManager() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ref = doc(db, "orders", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setOrder({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="order-page">
      <div className="back">
        <button onClick={() => navigate(-1)} className="btn-back">
          <FaArrowAltCircleLeft />
        </button>
      </div>

      <div className="receipt">
        <div className="receipt-header">
          <h2>Order Receipt</h2>
          <p>Order #{order.id.slice(0, 6)}</p>
        </div>

        <div className="receipt-section">
          <p><b>Name:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Wilaya:</b> {order.wilaya}</p>
          <p><b>Baladya:</b> {order.baladya}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Delivery:</b> {order.deliveryMethod}</p>
          <p><b>Status:</b> {order.status}</p>
        </div>

        <div className="receipt-section">
          <h3>Items</h3>
          {order.items?.map((item, i) => (
            <div key={i} className="receipt-item">
              <span>{item.name} × {item.qty}</span>
              <span>{item.price * item.qty} DZD</span>
            </div>
          ))}
        </div>

        <div className="receipt-summary">
          <p><span>Subtotal:</span><span>{order.subtotal || order.total - (order.deliveryFee || 0)} DZD</span></p>
          <p><span>Delivery:</span><span>{order.deliveryFee || 0} DZD</span></p>
          <h3 className="receipt-total">Total: {order.total} DZD</h3>
        </div>
      </div>
    </div>
  );
}
