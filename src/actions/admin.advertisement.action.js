import axios from "axios/index";

export function getAdvertisements(token) {
    //console.log(token);

    let data = {};
    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/admin/get-job-advertisements',data,axiosConfig );
    };
}


export function getAdvertisementById(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/admin/get-advertisement-by-id',data,axiosConfig );
    };
}


export function updateAdvertisementInspectedById(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/admin/update-advertisement-inspected-by-id',data,axiosConfig );
    };
}
