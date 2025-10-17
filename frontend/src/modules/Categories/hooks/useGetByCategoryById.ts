import api from "../../../api/AxiosClient";

type categoryType = {
    id: number;
    label: string;
    slug: string;
    status: number;
    created_at: string;
    updated_at: string;
}
type responseData = {
  id: number;
  label: string;
  slug: string;
  status: number;
  type_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  type: categoryType
};
async function useGetCategoryById(id: number): Promise<responseData> {
    try {
        const response = await api.get(`/categories/id/${id}`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export default useGetCategoryById