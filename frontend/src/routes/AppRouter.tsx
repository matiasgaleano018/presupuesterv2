import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

function AppRouter() {
    return (
        <Routes>
            {/* Ruta por defecto: redirige "/" a "/login" */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Rutas de tu aplicación */}
            <Route path="/login" element={<LoginPage />} />

            {/* Ruta 404 */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    )
}

export default AppRouter