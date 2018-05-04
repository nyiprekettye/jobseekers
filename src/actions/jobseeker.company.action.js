import axios from "axios/index";

export function updateCompanyRating(data,token) {
    //console.log(token);

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/insert-company-rating',data,axiosConfig );
    };
}