import { useState, type ChangeEvent } from "react";
import BasicAuth from "../components/BasicAuth";
import RegisterForm from "../components/RegisterForm";
import useCallAuthApi from "../hooks/useCallAuthApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useValidatePassword from "../hooks/useValidatePassword";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    const validatePassword = useValidatePassword(form.password);

    if (!validatePassword.isValid) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: validatePassword.message,
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    try {
      await useCallAuthApi({
        endPoint: "/register",
        body: {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
        },
      });

      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Ahora puedes iniciar sesión con tu correo y contraseña",
        icon: "success",
        confirmButtonText: "Ir al login",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/");
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Error desconocido";

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <BasicAuth
      title="Registrate"
      subtitle="Crea una cuenta y empeza a administrar tus finanzas."
    >
      {
        <RegisterForm
          {...form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      }
    </BasicAuth>
  );
}

export default RegisterPage;
