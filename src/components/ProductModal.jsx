// ProductModal.jsx
import React from "react";
import "../styles/ProductModal.css";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}></div>

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
            <button className="btn-add-to-cart">Add to Cart</button>
            <button className="btn-order-now">Order Now</button>
          </div>
        </div>
      </div>

  );
}
