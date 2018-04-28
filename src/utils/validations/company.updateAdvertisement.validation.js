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

    if (!validator.isEmpty(data.description) && data.description.length > 3000) {
        errors.description = 'This field length is must 0 between 3000 character';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}