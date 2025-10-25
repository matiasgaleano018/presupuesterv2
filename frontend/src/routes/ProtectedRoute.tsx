import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute() {
  const navigate = useNavigate();
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
        navigate("/");
      }
    });
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
