import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import Home from "../pages/Home";

function AppRouter() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;
