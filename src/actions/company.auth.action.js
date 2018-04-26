import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_COMPANY } from '../constans/auth.constans';

export function setCurrentCompany(company) {
    return {
        type: SET_CURRENT_COMPANY,
        company
    };
}


export function companyLogout() {
    return dispatch => {
        localStorage.removeItem('companyJwtToken');
        localStorage.removeItem('companyName');
        dispatch(setCurrentCompany({}));
    }
}


export function companyLogIn(data) {
    return dispatch => {
        return axios.post('/api/company/login', data)
            .then(res => {
                //console.log(res);
                const token = res.data.access_token;
                const name = res.data.name;
                //console.log(name);
                //console.log(token);
                localStorage.setItem('companyJwtToken', token);
                localStorage.setItem('companyName', name);
                //dispatch(setCurrentJobseeker({token: jwtDecode(token), userName : userName}));
                dispatch(setCurrentCompany({token: token, name : name}));
                return res;
            }).catch(error => {
                //console.log(error)
                return error;
            });
    }
}

export function companySignUp(data) {
    return dispatch => {
        return axios.post('/api/company/reg', data);
    }
}

export function companyGetData(token) {
    //console.log(token);
    var postData = {
    };

    let axiosConfig = {
        headers: {
            'access_token': token
        }
    };

    return dispatch => {
        return axios.post('/api/company/get-company-data',postData,axiosConfig  );
    };
}
