import api from "../../../api/AxiosClient";

type body = {
  type_id: number;
  label: string;
  number: string;
}

type Props = {
    body: body
}

async function usePostAccounts({ body }: Props) {
    const response = await api.post("/balance-accounts", body);
    return response;
}

export default usePostAccounts;