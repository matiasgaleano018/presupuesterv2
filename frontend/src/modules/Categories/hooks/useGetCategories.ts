import api from "../../../api/AxiosClient";

type responseData = {
  id: number;
  label: string;
  slug: string;
  status: number;
  type_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
};
async function useGetCategories(
  type: "income" | "expense" | "transfer" | "ajust"
): Promise<responseData[]> {
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
