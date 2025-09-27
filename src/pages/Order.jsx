import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";    
import "../styles/Order.css";

import { FaEdit, FaCheck } from "react-icons/fa";

export default function Order() {

  const { cart, addToCart, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [baladya, setBaladya] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [note, setNote] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();      
                 
  const wilayas = {
    Algiers: ["Bab El Oued", "El Madania", "Kouba"],
    Laghouat: ["Laghouat Centre", "Ksar El Hirane", "Aflou"],
    Oran: ["Bir El Djir", "Es Senia", "El Kerma"],
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    if (deliveryMethod === "desk") {
      setDeliveryFee(200);
    } else if (deliveryMethod === "home") {
      setDeliveryFee(500);
    } else {
      setDeliveryFee(0);
    }
  }, [deliveryMethod]);

  const finalTotal = cartTotal + deliveryFee;

  const increaseQty = (item) => {
    addToCart(item);
  };

  const decreaseQty = (item) => {
    if (item.qty === 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      for (let i = 0; i < item.qty - 1; i++) {
        addToCart(item);
      }
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!name || !phone || !wilaya || !baladya || !address || !deliveryMethod) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    setShowConfirm(true);
  };

  const pushOrderToFirestore = async (order) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), order);
    toast.success("Order saved to database!");
    setShowConfirm(false);
} catch (error) {
    console.error("❌ Error adding order: ", error);
    toast.error("Failed to save order, please try again.");
  }
};

  const confirmOrder = async () => {
  const order = {
    items: cart,
    name,
    phone,
    wilaya,
    baladya,
    address,
    deliveryMethod,
    deliveryFee,
    total: finalTotal,
    note: note || null,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  await pushOrderToFirestore(order);

  cart.forEach((item) => removeFromCart(item.id));


};


  return (
    <div className="order-container">
      <h2>Checkout</h2>

      <div className="order-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="order-item-info">
                <span>{item.name}</span>
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
                <span>{item.price * item.qty} DZD</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <form className="order-form" onSubmit={handlePlaceOrder}>
          <h3>Delivery Details</h3>

          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />

          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0555 55 55 55"
          />

          <label>Wilaya</label>
          <select value={wilaya} onChange={(e) => setWilaya(e.target.value)}>
            <option value="">Select Wilaya</option>
            {Object.keys(wilayas).map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          {wilaya && (
            <>
              <label>Baladya</label>
              <select
                value={baladya}
                onChange={(e) => setBaladya(e.target.value)}
              >
                <option value="">Select Baladya</option>
                {wilayas[wilaya].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Full Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street name, building, etc."
          />

          <label>Delivery Method</label>
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="desk">Pickup at Delivery Desk</option>
            <option value="home">Home Delivery</option>
          </select>

          <label>Additional Note (Optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special instructions for your order..."
          />

          <div className="order-summary">
            <p>Subtotal: {cartTotal} DZD</p>
            <p>Delivery Fee: {deliveryFee} DZD</p>
            <h3 className="total-price">Total: {finalTotal} DZD</h3>
          </div>

          <button type="submit" className="btn-place-order">
            Place Order
          </button>
        </form>
      )}

        {/* Confirmation Modal */}
        {showConfirm && (
        <div className="confirm-modal">
            <div className="receipt">
            <div className="receipt-header">
                <h2>Order Receipt</h2>
                <p className="receipt-date">{new Date().toLocaleString()}</p>
            </div>

            <div className="receipt-section customer-info">
                <h4>Customer Info</h4>
                <p><span className="label">Name:</span> {name}</p>
                <p><span className="label">Phone:</span> {phone}</p>
                <p><span className="label">Wilaya:</span> {wilaya}</p>
                <p><span className="label">Baladya:</span> {baladya}</p>
                <p><span className="label">Address:</span> {address}</p>
                <p>
                <span className="label">Delivery:</span>{" "}
                {deliveryMethod === "desk"
                    ? "Pickup at Delivery Desk"
                    : "Home Delivery"}
                </p>
                <p><span className="label">Note:</span> {note || "None"}</p>
            </div>

            <div className="receipt-section order-items">
                <h4>Items</h4>
                <ul>
                {cart.map((item) => (
                    <li key={item.id} className="receipt-item">
                    <span>{item.name} × {item.qty}</span>
                    <span>{item.price * item.qty} DZD</span>
                    </li>
                ))}
                </ul>
            </div>

            <div className="receipt-summary">
                <p><span>Subtotal:</span> {cartTotal} DZD</p>
                <p><span>Delivery Fee:</span> {deliveryFee} DZD</p>
                <h3 className="receipt-total">Total: {finalTotal} DZD</h3>
            </div>

            <div className="receipt-actions">
                <button className="btn-edit" onClick={() => setShowConfirm(false)}>
                <FaEdit className="icon" /> Edit Order
                </button>

                <button className="btn-confirm" onClick={confirmOrder}>
                <FaCheck className="icon" /> Confirm Order
                </button>
            </div>
            </div>
        </div>
        )}


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
    </div>
  );
}
