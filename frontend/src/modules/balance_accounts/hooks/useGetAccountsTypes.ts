import api from "../../../api/AxiosClient";
import type { BalanceAccountType } from "../types/balance-account.type";

async function useGetAccountsTypes(): Promise<BalanceAccountType[]>{
    const response = await api.get("/balance-accounts/resources/types");
    return response.data;
}

export default useGetAccountsTypes