import "../styles/Order.css";   

export default function ReceiptModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="confirm-modal" onClick={onClose}>
      <div
        className="receipt"
        onClick={(e) => e.stopPropagation()} 
      >
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
          <p>
            <span>Subtotal:</span>
            <span>{order.subtotal || order.total - (order.deliveryFee || 0)} DZD</span>
          </p>
          <p>
            <span>Delivery:</span>
            <span>{order.deliveryFee || 0} DZD</span>
          </p>
          <h3 className="receipt-total">Total: {order.total} DZD</h3>
        </div>

        <div className="receipt-actions">
          <button className="btn-confirm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
