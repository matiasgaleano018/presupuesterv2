import api from "../../../api/AxiosClient";

type body = {
    first_name: string;
    last_name: string;
    email: string;
}

type Props = {
    body: body
}
function usePutUser({ body }: Props) {
    const response = api.put("/users", body);

    return response;
}

export default usePutUser