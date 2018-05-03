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
