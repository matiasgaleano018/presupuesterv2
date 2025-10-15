import api from "../../../api/AxiosClient";

async function useLogout () {
    try {
        await api.get('/logout');
        localStorage.removeItem("token");
        window.location.href = "/login";
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export default useLogout