import {
    SET_CURRENT_USER,
    SET_CURRENT_JOBSEEKER,
    SET_CURRENT_COMPANY
} from '../constans/auth.constans';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    jobseekersIsAuthenticated: false,
    jobseekers: {},
    jobseekersName:'',
    companyIsAuthenticated: false,
    company: {},
    companyName:'',
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
        case SET_CURRENT_COMPANY: {
            return {
                companyIsAuthenticated: !isEmpty(action.company),
                company: action.company,
                companyName : action.company.name
            };
        }
        default: return state;
    }
}