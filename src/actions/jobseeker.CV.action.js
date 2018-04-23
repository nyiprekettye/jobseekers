import axios from 'axios';


export function jobseekerAddNewCV(token,data) {
    //console.log(token);
    var postData = {
    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/add-new-cv',postData,axiosConfig);
    };
}
