import api from "../../../api/AxiosClient";

type ResponseData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};
async function useGetUser(): Promise<ResponseData> {
    const responde = await api.get('/users');

    return responde.data;
}

export default useGetUser