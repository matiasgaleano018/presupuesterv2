import { useState, type ChangeEvent } from "react";
import BasicAuth from "../components/BasicAuth";
import RegisterForm from "../components/RegisterForm";
import Alert from "../../../components/ui/Alert";
import useCallAuthApi from "../hooks/useCallAuthApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<
    "success" | "danger" | "info" | "warning" | null
  >(null);

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
      setAlertMessage("Las contraseñas no coinciden");
      setAlertType("danger");
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
        navigate("/login");
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Error desconocido";

      setAlertMessage(message);
      setAlertType("danger");
    }
  };

  return (
    <BasicAuth
      title="Registrate"
      subtitle="Crea una cuenta y empeza a administrar tus finanzas."
    >
      {alertMessage && alertType && (
        <Alert menssage={alertMessage} type={alertType} />
      )}
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
