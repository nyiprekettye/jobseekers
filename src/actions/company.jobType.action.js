import axios from "axios/index";

export function getJobTypes(token) {
    //console.log(token);
    var postData = {
    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/get-job-types',postData,axiosConfig  );
    };
}
