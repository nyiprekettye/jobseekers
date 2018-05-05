import axios from 'axios';


export function jobseekerAddNewCV(token,data) {
    //console.log(token);


    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/add-new-cv',data,axiosConfig);
    };
}

export function getCVsById(token,data) {
    //console.log(token);


    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/get-cvs-by-id',data,axiosConfig);
    };
}

export function delCVById(data,token) {
    //console.log(token);


    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/del-cv-by-id',data,axiosConfig);
    };
}
