import axios from "axios/index";

export function getApllyJobs(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/get-apply-jobs',data,axiosConfig );
    };
}

export function updateApllyJob(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/update-apply-job',data,axiosConfig );
    };
}
