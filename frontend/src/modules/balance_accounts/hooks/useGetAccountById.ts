import api from "../../../api/AxiosClient";

async function useGetAccountById(accountId: number) {
    try {
        const response = await api.get(`/balance-accounts/id/${accountId}`);

        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export default useGetAccountById