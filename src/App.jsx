import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Contest from "./pages/ContestPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contest" element={<Contest />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
