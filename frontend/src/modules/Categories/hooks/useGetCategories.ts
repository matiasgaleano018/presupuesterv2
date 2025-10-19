import api from "../../../api/AxiosClient";
import type { Category } from "../types/categories.type";

type Props = {
  type: "income" | "expense" | "transfer" | "ajust" | "all";
  params?: object;
}
async function useGetCategories({ type, params = {} }: Props): Promise<Category[]> {
  if (type === "all") {
    const response = await api.get("/categories", { params });
    return response.data;
  }
  const typeMap = {
    income: 10,
    expense: 20,
    transfer: 30,
    ajust: 40,
  };

  const typeId = typeMap[type];
  const response = await api.get(`/categories/typeId/${typeId}`, { params });

  return response.data;
}

export default useGetCategories;
