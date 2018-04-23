import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)) {
        errors.username = 'This field is required';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
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
    if (Validator.isEmpty(data.tax_number)) {
        errors.tax_number = 'This field is required';
    }
    if (!Number.isFinite(Number.parseInt(data.tax_number))) {
        errors.tax_number = 'Tax number must be number';
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}