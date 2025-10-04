import api from "../../../api/AxiosClient"

type body = {
    email: string;
    password: string;
}

type Props = {
    endPoint: '/login' | '/register';
    body: body
}
async function useCallAuthApi({endPoint, body}: Props) {
    const response = await api.post(endPoint, body);
    console.log(response)
    switch(endPoint) {
        case '/login':
            if(response.status === 201 || response.status === 200) {
                localStorage.setItem("token", response.data.access_token);
            }
    }
    return response;
}

export default useCallAuthApi