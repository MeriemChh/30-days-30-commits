import React from "react";
import { useCart } from "../context/CartContext";
import { FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";   
import "../styles/Cart.css";                

export default function Cart() {
    const navigate = useNavigate();  
    const { cart, isCartOpen, toggleCart, addToCart, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const increaseQty = (item) => {
    addToCart(item); 
  };

  const decreaseQty = (item) => {
    if (item.qty === 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id); 
      addToCart({ ...item, qty: item.qty - 1 }); 
    }
  };

  return (
    <div className="cart-screen">
      <div className="cart-header">
        <h2>Your Cart </h2>
        <FiX size={24} onClick={toggleCart} className="cart-close" />
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-item-qty-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
                <span className="cart-item-price">{item.price} DZD</span>
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <button 
                onClick={() => navigate("/order")} 
                className="btn-checkout"
            >
                Checkout
            </button>
        </div>
      )}
    </div>
  );
}
