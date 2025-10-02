import BasicAuth from "./components/BasicAuth";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <BasicAuth
      title="Registrate"
      subtitle="Inicia sesión y comienza a administrar tus finanzas."
      children={<LoginForm />}
    />
  );
}

export default LoginPage;
