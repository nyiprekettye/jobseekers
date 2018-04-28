import axios from "axios/index";


export function companyNewAdvertisement(token,data) {
    //console.log(token);


    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/new-advertisement',data,axiosConfig );
    };
}


export function getAdvertisements(token) {
    //console.log(token);

    let data = {};
    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/get-job-advertisements',data,axiosConfig );
    };
}
export function updateAdvertisementArchiveState(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/update-advertisement-archive-row',data,axiosConfig );
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
        return axios.post('/api/company/get-advertisement-by-id',data,axiosConfig );
    };
}


export function updateAdvertisementById(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/update-advertisement-by-id',data,axiosConfig );
    };
}