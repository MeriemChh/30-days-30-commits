import { useState } from "react";
import "../styles/Create.css";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "cake",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New item:", form);
    alert("✅ Product created (check console)");
  };

  return (
    <div className="create">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price (DA)
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="cake">Cake</option>
            <option value="service">Service</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label >
          Upload Image
          <input
          className="file-upload"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
}
