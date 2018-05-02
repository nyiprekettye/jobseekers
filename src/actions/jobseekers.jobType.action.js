import axios from "axios/index";

export function getJobTypes(token) {
    //console.log(token);
    let postData = {

    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/get-job-types',postData,axiosConfig  );
    };
}

export function addNewJobTpye(jobTypeId,token) {
    //console.log(token);
    let postData = {
        jobTypeId:jobTypeId
    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/add-new-job-type',postData,axiosConfig  );
    };
}

export function delJobTpye(jobseekerJobTypeId,token) {
    //console.log(token);
    let postData = {
        jobseekerJobTypeId:jobseekerJobTypeId
    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/del-job-type',postData,axiosConfig  );
    };
}

