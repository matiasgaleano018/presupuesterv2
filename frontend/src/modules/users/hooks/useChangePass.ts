import api from "../../../api/AxiosClient"

type body = {
    old_password: string;
    new_password: string;
    email: string;
}

type Props = {
    body: body
}
async function useChangePass({ body }: Props) {
    try {
        const response = await api.post('/users/change-password', body);

        return { status: response.status, message: "Contraseña actualizada" };
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

export default useChangePass