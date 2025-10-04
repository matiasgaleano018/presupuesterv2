import { useState, type ChangeEvent } from "react";
import BasicAuth from "../components/BasicAuth";
import LoginForm from "../components/LoginForm";
import useCallAuthApi from "../hooks/useCallAuthApi";
import Alert from "../../../components/ui/Alert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};
function LoginPage() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<
    "success" | "danger" | "info" | "warning" | null
  >(null);

  const [form, setForm] = useState<FormData>({
    email: "",
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
    try {
      const response = await useCallAuthApi({ endPoint: "/login", body: form });

      setAlertMessage(response.data.message);
      setAlertType("success");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
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
      title="Iniciar sesión"
      subtitle="Inicia sesión y comienza a administrar tus finanzas."
    >
      {alertMessage && alertType && (
        <Alert menssage={alertMessage} type={alertType} />
      )}
      <LoginForm onSubmit={handleSubmit} onChange={handleChange} {...form} />
    </BasicAuth>
  );
}

export default LoginPage;
