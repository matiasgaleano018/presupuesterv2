import BasicAuth from "../components/BasicAuth";
import LoginForm from "../components/LoginForm";
import useCallAuthApi from "../hooks/useCallAuthApi";

function LoginPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await useCallAuthApi();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicAuth
      title="Registrate"
      subtitle="Inicia sesión y comienza a administrar tus finanzas."
      children={<LoginForm onSubmit={handleSubmit} />}
    />
  );
}

export default LoginPage;
