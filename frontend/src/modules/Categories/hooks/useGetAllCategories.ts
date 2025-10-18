import api from "../../../api/AxiosClient";
import type { Category } from "../types/categories.type";

async function useGetAllCategories(): Promise<Category[]> {
    try{
        const response = await api.get("/categories");
        return response.data;
    }catch(error){
        console.log(error);
        return Promise.reject(error);
    }
}

export default useGetAllCategories;