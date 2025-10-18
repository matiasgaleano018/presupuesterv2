import api from "../../../api/AxiosClient";
import type { User } from "../types/user.type";

async function useGetUser(): Promise<User> {
    const responde = await api.get('/users');

    return responde.data;
}

export default useGetUser