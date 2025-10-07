import api from "../../../api/AxiosClient";

async function useGetUser() {
    const responde = await api.get('/users');

    return responde;
}

export default useGetUser