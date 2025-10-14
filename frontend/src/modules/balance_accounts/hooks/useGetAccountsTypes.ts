import api from "../../../api/AxiosClient";

async function useGetAccountsTypes() {
    const response = await api.get("/balance-accounts/resources/types");
    return response.data;
}

export default useGetAccountsTypes