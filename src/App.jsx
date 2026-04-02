import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Contest from "./pages/ContestPage";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* ✅ ROUTES */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contest" element={<Contest />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ✅ USER PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* Example: add protected pages here */}
        </Route>

        {/* ✅ ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {/* ✅ TOAST OUTSIDE ROUTES */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;