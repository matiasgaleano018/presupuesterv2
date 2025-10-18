import api from "../../../api/AxiosClient";
import type { BalanceAccount } from "../types/balance-account.type";

async function useGetAccounts(typeId?: number): Promise<BalanceAccount[]> {
  const response = await api.get(
    `/balance-accounts${typeId ? "/type/" + typeId : ""}`
  );

  return response.data;
}

export default useGetAccounts;
