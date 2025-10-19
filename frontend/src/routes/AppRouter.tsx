import { Routes, Route } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import Home from "../pages/Home";
import AddMovement from "../modules/balance_operations/components/AddMovement";
import AccountsPage from "../modules/balance_accounts/pages/AccountsPage";
import AddAccountsPage from "../modules/balance_accounts/pages/AddAccountsPage";
import ProtectedRoute from "./ProtectedRoute";
import CategoriesPage from "../modules/Categories/pages/CategoriesPage";
import AddCategory from "../modules/Categories/components/AddCategory";
import UserPage from "../modules/users/pages/UserPage";
import ChangePass from "../modules/users/pages/ChangePass";
import EditCategory from "../modules/Categories/components/EditCategory";
import MovementsPage from "../modules/balance_operations/pages/MovementsPage";

function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />

        <Route path="/movements" element={<MovementsPage />}></Route>
        <Route path="/movements/:type" element={<AddMovement />}></Route>

        <Route path="/accounts" element={<AccountsPage />}></Route>
        <Route path="/accounts/new" element={<AddAccountsPage />}></Route>
        <Route
          path="/accounts/:accountId/edit"
          element={<AddAccountsPage />}
        ></Route>

        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/categories/new" element={<AddCategory />}></Route>
        <Route path="/categories/:id/edit" element={<EditCategory />}></Route>

        <Route path="/profile" element={<UserPage />}></Route>
        <Route path="/profile/change-password" element={<ChangePass />}></Route>
      </Route>

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;
