import Avatar from "react-avatar";
import useGetUser from "../../modules/users/hooks/useGetUser";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type userData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};
function UserHeader() {
  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    useGetUser()
      .then((data) => setUser(data))
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);

  return (
    <>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src="logo.png"
                width="110"
                height="32"
                alt="Tabler"
                className="navbar-brand-image"
              />{" "}
              Presupuester
            </a>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span className="avatar avatar-sm">
                  <Avatar
                    name={`${user?.first_name} ${user?.last_name}`}
                    round={true}
                    size="35"
                    color="#4C9AFF"
                  />
                </span>
                <div className="d-none d-xl-block ps-2">
                  <div>{user && user.first_name + " " + user.last_name}</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="#" className="dropdown-item">
                  Mi perfil
                </a>
                <a href="#" className="dropdown-item">
                  Configuraciones
                </a>
                <div className="dropdown-divider"></div>
                <a href="./sign-in.html" className="dropdown-item">
                  Cerrar sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default UserHeader;
