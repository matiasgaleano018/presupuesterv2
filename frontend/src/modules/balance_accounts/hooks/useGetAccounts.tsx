import api from "../../../api/AxiosClient";

type AccType = {
  id: number;
  label: string;
  slug: string;
  status: number;
  created_at: Date;
  updated_at: Date;
};
type ResponseData = {
  id: number;
  type_id: number;
  label: string;
  user_id: number;
  amount: number;
  number: string;
  status: number;
  description: string;
  type: AccType;
  created_at: Date;
  updated_at: Date;
};
async function useGetAccounts(typeId?: number): Promise<ResponseData[]> {
  const response = await api.get(
    `/balance-accounts${typeId ? "/" + typeId : ""}`
  );

  return response.data;
}

export default useGetAccounts;
