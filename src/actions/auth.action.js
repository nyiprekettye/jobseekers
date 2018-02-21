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
        return axios.post('/api/auth', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    }
}