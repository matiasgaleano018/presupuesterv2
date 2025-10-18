import api from "../../../api/AxiosClient";
import type { BalanceAccount } from "../types/balance-account.type";

type Props = {
  typeId?: number;
  params?: object;
}
async function useGetAccounts({ typeId, params = {} }: Props = {}): Promise<BalanceAccount[]> {
  const response = await api.get(
    `/balance-accounts${typeId ? "/type/" + typeId : ""}`, { params }
  );

  return response.data;
}

export default useGetAccounts;
