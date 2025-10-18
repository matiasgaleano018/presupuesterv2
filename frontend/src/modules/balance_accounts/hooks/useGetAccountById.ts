import api from "../../../api/AxiosClient";
import type { BalanceAccount } from "../types/balance-account.type";

async function useGetAccountById(accountId: number): Promise<BalanceAccount> {
    try {
        const response = await api.get(`/balance-accounts/id/${accountId}`);

        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export default useGetAccountById