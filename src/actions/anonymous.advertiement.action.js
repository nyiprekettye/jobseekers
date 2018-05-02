import axios from "axios/index";

export function getAdvertisementBySearchText(data) {
    //console.log(token);

    return dispatch => {
        return axios.post('/api/anonymous/get-advertisement-by-search-text',data );
    };
}
export function getAdvertisementById(data) {
    //console.log(token);

    return dispatch => {
        return axios.post('/api/anonymous/get-advertisement-by-id',data );
    };
}