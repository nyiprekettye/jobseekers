import axios from "axios/index";

export function getCompanyById(data) {
    //console.log(token);

    return dispatch => {
        return axios.post('/api/anonymous/get-company-by-id',data );
    };
}

export function getCompanyRatingById(data) {
    //console.log(token);

    return dispatch => {
        return axios.post('/api/anonymous/get-company-rating-by-id',data );
    };
}