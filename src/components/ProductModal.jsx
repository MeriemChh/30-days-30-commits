import React from "react";
import "../styles/ProductModal.css";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart, toggleCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);  
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <button className="modal-close-btn" onClick={onClose}>
        ✕
      </button>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
        <div className="modal-image-wrapper">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="modal-image"
          />
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-category">{product.category}</p>
          <p className="modal-description">
            {product.description || "Delicious cake ready to enjoy!"}
          </p>
          <p className="modal-price">{product.price} DZD</p>

          <div className="modal-buttons">
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
