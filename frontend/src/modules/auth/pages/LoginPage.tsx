import BasicAuth from "../components/BasicAuth";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <BasicAuth
      title="Iniciar sesión"
      subtitle="Inicia sesión y comienza a administrar tus finanzas."
    >
      <LoginForm />
    </BasicAuth>
  );
}

export default LoginPage;
