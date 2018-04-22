import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from '../constans/auth.constans';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        dispatch(setCurrentUser({}));
    }
}

export function login(data) {
    return dispatch => {
        return axios.post('/api/jobseekers/login', data)
            .then(res => {
                //console.log(res);
                const token = res.data.access_token;
                //console.log(token);
                localStorage.setItem('jwtToken', token);
                dispatch(setCurrentUser(jwtDecode(token)));
            }).catch(error => {
                    console.log(error)
            });
    }
}