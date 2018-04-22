import {
    SET_CURRENT_USER,
    SET_CURRENT_JOBSEEKER
} from '../constans/auth.constans';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    jobseekersIsAuthenticated: false,
    jobseekers: {},
    jobseekersName:'',
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case SET_CURRENT_JOBSEEKER: {
            return {
                jobseekersIsAuthenticated: !isEmpty(action.jobseekers),
                jobseekers: action.jobseekers,
                jobseekersName : action.jobseekers.userName
            };
        }
        default: return state;
    }
}