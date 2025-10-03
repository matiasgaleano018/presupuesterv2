import api from "../../../api/AxiosClient"

async function useCallAuthApi() {
    const response = await api.post('testFail');
    return response;
}

export default useCallAuthApi