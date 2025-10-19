import api from "../../../api/AxiosClient";
import type { DetailsMovementData } from "../types/balance-operation.type";

type Props = {
  params?: object;
};
async function useGetDetailsMovements({
  params = {},
}: Props): Promise<DetailsMovementData[]> {
    try {
        const response = await api.get("/op/details", { params });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export default useGetDetailsMovements;
