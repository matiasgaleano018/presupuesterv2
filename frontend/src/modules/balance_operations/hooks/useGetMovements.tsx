import api from "../../../api/AxiosClient";
import type { BalanceOperation } from "../types/balance-operation.type";

type Props = {
  params?: object;
};
async function useGetMovements({
  params = {},
}: Props): Promise<BalanceOperation[]> {
  const response = await api.get("/op", { params });

  return response.data;
}
export default useGetMovements;
