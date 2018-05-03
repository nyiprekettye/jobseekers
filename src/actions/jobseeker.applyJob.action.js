import axios from "axios/index";

export function getApllyJob(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/get-apply-job',data,axiosConfig );
    };
}

export function getApllyJobs(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/get-apply-jobs',data,axiosConfig );
    };
}

export function insertNewApplyJob(data,token) {
    //console.log(token);
    //console.log(data)
    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/add-new-apply-job',data,axiosConfig );
    };
}
export function delApplyJob(data,token) {
    //console.log(token);
    //console.log(data)
    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/del-apply-job',data,axiosConfig );
    };
}
