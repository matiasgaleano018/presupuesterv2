import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useChangePass from "../hooks/useChangePass";
import useValidatePassword from "../../auth/hooks/useValidatePassword";

type formData = {
  old_password: string;
  new_password: string;
};
type Props = {
  email: string;
};
function FormChangePass({ email }: Props) {
  const [form, setForm] = useState<formData>({
    old_password: "",
    new_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.old_password === form.new_password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las contraseñas no pueden ser iguales",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (useValidatePassword(form.new_password).isValid === false) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: useValidatePassword(form.new_password).message,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      await useChangePass({
        body: {
          email: email,
          old_password: form.old_password,
          new_password: form.new_password,
        },
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-outline form-white mb-4">
                <label htmlFor="first_name" className="form-label">
                  Contraseña anterior
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Ingrese su contraseña anterior"
                  name="old_password"
                  required
                  value={form.old_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-outline form-white mb-4">
                <label htmlFor="last_name" className="form-label">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Ingrese su nueva contraseña"
                  name="new_password"
                  required
                  value={form.new_password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/">
              <i className="fas fa-arrow-left px-1"></i> Volver
            </Link>
            <button className="btn btn-primary btn-lg px-5 ms-3" type="submit">
              <i className="fas fa-save px-1"></i> Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormChangePass;
