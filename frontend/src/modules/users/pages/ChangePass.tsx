import Avatar from "react-avatar";
import BaseLayout from "../../../pages/components/BaseLayout";
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import Swal from "sweetalert2";
import FormChangePass from "../components/FormChangePass";

type userData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};
function ChangePass() {
  const [user, setUser] = useState<userData>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
  });

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
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Cambiar contraseña
            </h3>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex justify-content-center my-2">
                  <Avatar
                    name={`${user?.first_name.charAt(
                      0
                    )} ${user?.last_name.charAt(0)}`}
                    round={true}
                    size="150"
                    color="#4C9AFF"
                  />
                </div>
                <h5 className="text-center fs-1 my-4">{`${user?.first_name} ${user?.last_name}`}</h5>
                <div className="col-12">
                  <FormChangePass email={user?.email} />
                </div>
                <div>
                  <span className="text-white-50">
                    <ul className="text-start">
                      <li>La contraseña debe tener al menos 6 caracteres</li>
                      <li>
                        Debe tener al menos un número y un carácter especial
                        (@#$.%)
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default ChangePass;
