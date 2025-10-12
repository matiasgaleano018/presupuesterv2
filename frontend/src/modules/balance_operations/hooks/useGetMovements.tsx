import api from "../../../api/AxiosClient";

type categoryData = {
  id: number;
  slug: string;
  label: string;
  type_id: number;
  user_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};

type AccountData = {
  id: number;
  type_id: number;
  label: string;
  user_id: number;
  amount: number;
  number: string;
  status: number;
  description: string;
  created_at: string;
  updated_at: string;
};

type detailData = {
  id: number;
  account_id: number;
  account: AccountData;
  amount: number;
  next_acc_amount: number;
  prev_acc_amount: number;
  operation_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};

type typeOpData = {
  id: number;
  slug: string;
  label: string;
  status: number;
  created_at: string;
  updated_at: string;
};
type movementsData = {
  id: number;
  type_id: number;
  user_id: number;
  category_id: number;
  amount: number;
  category: categoryData;
  details: detailData[];
  type: typeOpData;
  status: number;
  created_at: string;
  updated_at: string;
};

type Props = {
  body?: object;
};
async function useGetMovements({ body = {} }: Props): Promise<movementsData[]> {
  const response = await api.get("/op", body);

  return response.data;
}
export default useGetMovements;
