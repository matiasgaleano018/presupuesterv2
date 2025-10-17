import api from "../../../api/AxiosClient";

type body = {
    label: string
    slug: string
    is_active: boolean
}
type Props = {
    id: number,
    body: body
}
async function usePutCategories({ id, body }: Props) {
    try {
        const response = await api.put(`/categories/${id}`, body);
        return response;
    }catch (error: any) {
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

export default usePutCategories