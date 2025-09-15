import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Create.css";
import Preview from "./Preview";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "cake",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

const uploadToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);
  data.append("folder", "cakestore");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Cloudinary upload failed");
  return json.secure_url; 
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = "";
      if (form.image) {
        imageUrl = await uploadToCloudinary(form.image);
      }

      await addDoc(collection(db, "products"), {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        imageUrl,
        createdAt: new Date(),
      });

      toast("Product saved successfully!");
      setForm({
        name: "",
        price: "",
        category: "cake",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error saving product:", err);
      toast("Failed to save product.");
    }

    setLoading(false);
  };

  return (
    <div className="create">
      <h3>Add New Product</h3>
      <div className="create-container">
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

          <label>
            Upload Image
            <input
              className="file-upload"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>

        {/* Preview component */}
        <div className="preview-container">
          <Preview form={form} />
        </div>
      </div>
      <ToastContainer 
         position="top-right"
         autoClose={3000}
         hideProgressBar={true}
         newestOnTop={false}
         closeOnClick
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light" 
       />

    </div>
  );
}
