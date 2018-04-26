import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_ADMIN } from '../constans/auth.constans';

export function setCurrentAdmin(admin) {
    return {
        type: SET_CURRENT_ADMIN,
        admin
    };
}


export function adminsLogout() {
    return dispatch => {
        localStorage.removeItem('adminJwtToken');
        localStorage.removeItem('adminName');
        dispatch(setCurrentAdmin({}));
    }
}


export function adminLogin(data) {
    return dispatch => {
        return axios.post('/api/admin/login', data)
            .then(res => {
                const token = res.data.access_token;
                localStorage.setItem('adminJwtToken', token);
                dispatch(setCurrentAdmin({token: token}));
                return res;
            }).catch(error => {
                return error
            });
    }
}

