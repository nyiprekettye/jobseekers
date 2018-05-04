import axios from "axios/index";

export function getJobseekerById(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/get-jobseeker-by-id',data,axiosConfig );
    };
}

export function getJobseekerRating(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/get-jobseeker-rating',data,axiosConfig );
    };
}

export function updateJobseekerRating(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/insert-jobseeker-rating',data,axiosConfig );
    };
}
