// src/pages/Admin.jsx
import "../styles/Admin.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("dashboard");

  const renderComponent = () => {
    switch (view) {
      case "dashboard": return <h2>dashboard</h2>;
      default: return <h2>dashboard</h2>;
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Sign out error:", err.message);
    }
  };

if (loading) {
  return (
    <div className="loading">
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>  
  );
}


  return (
    <div className="admin">
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav>
          <button onClick={() => navigate("/")} className="nav-link">Home</button>
          <button onClick={() => setView("dashboard")} className="nav-link">Dashboard</button>
        </nav>
        
        <nav>
          <button onClick={() => handleSignOut()} className="nav-link">Sign out</button>
        </nav>
        
      </aside>

      <div className="main">
        <button
          className="glass-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <section className="content">
          {renderComponent()}
        </section>
      </div>
    </div>
  );
}
