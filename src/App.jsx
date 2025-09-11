import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Error404 from "./pages/Error404"

import "./App.css";  

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Error404 />} />

    </Routes>
  </Router>
  );
}

export default App;
