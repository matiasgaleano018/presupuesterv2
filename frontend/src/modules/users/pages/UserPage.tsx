import { useEffect, useState } from "react";
import BaseLayout from "../../../pages/components/BaseLayout";
import FormUser from "../components/FormUser";
import useGetUser from "../hooks/useGetUser";
import Swal from "sweetalert2";
import Avatar from "react-avatar";

type userData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

function UserPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Editar usuario
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
                <div className="col-12"></div>
              </div>
            </div>
            <FormUser
              userData={user!}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default UserPage;
