import "./LoginPage.css";
import BasicAuth from "./components/BasicAuth";
import RegisterForm from "./components/RegisterForm";

function RegisterPage() {
  return (
    <BasicAuth
      title="Registrate"
      subtitle="Crea una cuenta y empeza a administrar tus finanzas."
      children={<RegisterForm />}
    />
  );
}

export default RegisterPage;
