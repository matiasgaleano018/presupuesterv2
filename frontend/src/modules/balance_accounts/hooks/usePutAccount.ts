import api from "../../../api/AxiosClient";

type body = {
    label: string;
    number: string;
    is_active: boolean;
}

type Props = {
    accountId: number;
    body: body;
}
function usePutAccount({ accountId, body }: Props) {
    try {
        const response = api.put(`/balance-accounts/${accountId}`, body);
        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

export default usePutAccount