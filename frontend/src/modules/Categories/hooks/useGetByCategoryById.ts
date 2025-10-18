import api from "../../../api/AxiosClient";
import type { Category } from "../types/categories.type";

async function useGetCategoryById(id: number): Promise<Category> {
    try {
        const response = await api.get(`/categories/id/${id}`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export default useGetCategoryById