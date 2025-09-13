import "../styles/Preview.css";

export default function Preview({ form }) {
  if (!form.name && !form.price && !form.image) {
    return (
      <div className="preview placeholder">
        <p>Product preview will appear here</p>
      </div>
    );
  }

  const imageURL = form.image ? URL.createObjectURL(form.image) : null;

  return (
    <div className="preview-card">
      {imageURL && (
        <div
          className="preview-bg"
          style={{ backgroundImage: `url(${imageURL})` }}
        ></div>
      )}
      <div className="preview-overlay">
        <div className="preview-info">
          <div className="info-header">
            <div className="title-category">
              <h4 className="preview-title">{form.name || "Unnamed Product"}</h4>
              <span className="preview-category">{form.category}</span>
            </div>
            <p className="preview-price">
              {form.price ? `${form.price} DA` : "—"}
            </p>
          </div>

          <p className="preview-description">{form.description}</p>
        </div>

        <button className="preview-btn">Order Yours</button>
      </div>
    </div>
  );
}
