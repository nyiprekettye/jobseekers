import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_JOBSEEKER } from '../constans/auth.constans';

export function setCurrentJobseeker(jobseekers) {
    return {
        type: SET_CURRENT_JOBSEEKER,
        jobseekers
    };
}


export function jobseekersLogout() {
    return dispatch => {
        localStorage.removeItem('jobseekerJwtToken');
        localStorage.removeItem('jobseekerName');
        dispatch(setCurrentJobseeker({}));
    }
}


export function jobseekerLogin(data) {
    return dispatch => {
        return axios.post('/api/jobseekers/login', data)
            .then(res => {
                //console.log(res);
                const token = res.data.access_token;
                const userName = res.data.userName;
                //console.log(token);
                localStorage.setItem('jobseekerJwtToken', token);
                localStorage.setItem('jobseekerName', userName);
                //dispatch(setCurrentJobseeker({token: jwtDecode(token), userName : userName}));
                dispatch(setCurrentJobseeker({token: token, userName : userName}));
            }).catch(error => {
                console.log(error)

            });
    }
}

export function jobseekerSignUp(data) {
    return dispatch => {
        return axios.post('/api/jobseekers/reg', data);
    }
}

export function jobseekerGetData(token) {
    //console.log(token);
    var postData = {
    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/jobseekers/jobseeker-data',postData,axiosConfig  );
    };
}
