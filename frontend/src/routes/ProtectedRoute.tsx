import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Tu sesión ha caducado, inicia sesión nuevamente",
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: "Ir al login",
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.href = "/login";
        //return <Navigate to="/login" replace />;
      }
    });
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
