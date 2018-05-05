import axios from "axios/index";

export function getPaymentsData(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/admin/get-payments-data',data,axiosConfig );
    };
}
