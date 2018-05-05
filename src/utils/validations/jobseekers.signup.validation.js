import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)) {
        errors.username = 'This field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.pw)) {
        errors.password = 'This field is required';
    }
    if (Validator.isEmpty(data.pw2)) {
        errors.passwordConfirmation = 'This field is required';
    }
    if (!Validator.equals(data.pw, data.pw2)) {
        errors.passwordConfirmation = 'Passwords must match';
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = 'This field is required';
    }
    if (Validator.isEmpty(data.birth)) {
        errors.birth = 'This field is required';
    }

    if (data.birth <= 1900) {
        errors.birth = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}