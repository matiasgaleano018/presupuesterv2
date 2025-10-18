import api from "../../../api/AxiosClient";
import type { Category } from "../types/categories.type";

async function useGetCategories(
  type: "income" | "expense" | "transfer" | "ajust"
): Promise<Category[]> {
  const typeMap = {
    income: 10,
    expense: 20,
    transfer: 30,
    ajust: 40,
  };

  const typeId = typeMap[type];
  const response = await api.get(`/categories/typeId/${typeId}`);

  return response.data;
}

export default useGetCategories;
