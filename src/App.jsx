import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Contest from "./pages/ContestPage";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/AdminLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContestPage from "./pages/AdminContestPage";
import ContestDetailsPage from "./pages/ContestDetailsPage";
import AdminUsersPage from "./pages/AdminUserPage";

import SubmitProjectPage from "./pages/SubmitProjectPage";
import ProfilePage from "./pages/ProfilePage";
import MyContestsPage from "./pages/MyContestsPage";
import AdminTeamPage from "./pages/AdminTeamPage";
import AdminSubmissionPage from "./pages/AdminSubmissionPage";
import AdminEvaluationPage from "./pages/AdminEvaluationPage";
import Winners from "./pages/Winners";

function App() {
  return (
    <>
      {/* ✅ ROUTES */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/winners" element={<Winners />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ✅ USER PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/submit-project/:id" element={<SubmitProjectPage />} />
          <Route element={<Layout />}>
            <Route path="/contest/:id" element={<ContestDetailsPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-contests" element={<MyContestsPage />} />
          </Route>
        </Route>

        {/* ✅ ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />

            <Route path="contest" element={<AdminContestPage />} />
            <Route path="teams" element={<AdminTeamPage />} />
            <Route
              path="submissions/:contestId"
              element={<AdminSubmissionPage />}
            />
            <Route path="evaluate/:teamId" element={<AdminEvaluationPage />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
