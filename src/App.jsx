import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Contest from "./pages/ContestPage";
import AdminDashboard from "./pages/AdminDashboard"; // create this

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contest" element={<Contest />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* USER PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}></Route>

      {/* ADMIN ROUTES */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
