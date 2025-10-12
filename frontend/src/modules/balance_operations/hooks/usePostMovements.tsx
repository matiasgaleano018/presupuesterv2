import api from "../../../api/AxiosClient";

type Props = {
  body: {
    type_slug: string;
    category_id: number;
    amount: number;
    target_account_id: number;
    source_account_id?: number;
  };
};
function usePostMovements({ body }: Props) {
  const response = api.post("/op", body);
  return response;
}

export default usePostMovements;
