import api from "../../../api/AxiosClient";

function useLogout () {
    const response = api.get('/logout');
    localStorage.removeItem("token");

    return response;
    
}

export default useLogout