import api from "../../../api/AxiosClient";

type body = {
    type_slug: string;
    label: string;
    slug: string;
}

type Props = {
    body: body
}
async function usePostCategories({ body }: Props) {
    const response = await api.post("/categories", body);
    return response;
    
}

export default usePostCategories