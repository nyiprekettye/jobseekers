import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }

    if (validator.isEmpty(data.city)) {
        errors.city = 'This field is required';
    }

    if (validator.isEmpty(data.description)) {
        errors.description = 'This field is required';
    }
    if (validator.isEmpty(data.payment)) {
        errors.description = 'This field is required';
    }

    if (!validator.isEmpty(data.description) && data.description.length > 3000) {
        errors.description = 'This field length is must 0 between 3000 character';
    }

    if (!validator.isEmpty(data.payment) && data.payment <30000) {
        errors.payment = 'The payment must highter than 30000';
    }

    if (!validator.isEmpty(data.current_job_type) && data.current_job_type <1 ) {
        errors.current_job_type = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}