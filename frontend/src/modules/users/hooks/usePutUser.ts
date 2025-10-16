import api from "../../../api/AxiosClient";

type body = {
    first_name: string;
    last_name: string;
    email: string;
}

type Props = {
    body: body
}
async function usePutUser({ body }: Props) {
  try {
    const response = await api.put("/users", body);
    return { status: response.status, message: "Usuario actualizado" };

  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || `Error ${error.response.status} en la solicitud`;
      throw new Error(errorMessage); 

    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor. Inténtalo de nuevo.");

    } else {
      throw new Error(error.message || "Ha ocurrido un error inesperado.");
    }
  }
}

export default usePutUser