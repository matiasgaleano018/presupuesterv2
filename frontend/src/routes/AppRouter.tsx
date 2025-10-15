import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import Home from "../pages/Home";
import AddMovement from "../modules/balance_operations/components/AddMovement";
import AccountsPage from "../modules/balance_accounts/pages/AccountsPage";
import AddAccountsPage from "../modules/balance_accounts/pages/AddAccountsPage";

function AppRouter() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas privadas se controla el token */}
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

      <Route path="/operations/:type" element={<AddMovement />}></Route>

      <Route path="/accounts" element={<AccountsPage />}></Route>
      <Route path="/accounts/new" element={<AddAccountsPage />}></Route>

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;
