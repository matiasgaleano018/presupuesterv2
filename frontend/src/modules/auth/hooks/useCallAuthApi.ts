import api from "../../../api/AxiosClient";

type Props = {
  endPoint: string;
  body: any;
};

type responseApi = {
  status: number;
  message: string;
};

async function useCallAuthApi({ endPoint, body }: Props): Promise<responseApi> {
  try {
    const response = await api.post(endPoint, body);

    if (response.status === 201 || response.status === 200) {
      if (endPoint === "/login") {
        localStorage.setItem("token", response.data.access_token);
        return { status: response.status, message: "Inicio de sesión exitoso" };
      }
    }
    return { status: response.status, message: "Operación exitosa" };

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

export default useCallAuthApi;
