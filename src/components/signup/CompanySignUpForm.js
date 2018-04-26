
import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from "../../utils/validations/company.signup.validation"

import { companySignUp } from '../../actions/company.auth.action';

class CompanySignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'asd',
            name: 'company kft.',
            email: 'asd@asd.com',
            pw: 'asd',
            pw2: 'asd',
            tax_number: '1234',
            city: 'Budapset',
            fullAddress: '1234 Budapest Szeged utca 34.',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        //console.log(this.state)
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            const data ={
                username :this.state.username,
                name :this.state.name,
                email: this.state.email,
                pw: this.state.pw,
                tax_number: Number.parseInt(this.state.tax_number),
                city :this.state.city,
                fullAddress :this.state.fullAddress
            };

            this.props.companySignUp(data)
                .then(
                    () => {
                        this.context.router.history.push('/company-login')
                    },
                    (err) => {
                        console.log(err);
                        this.setState({ errors:{response: err.response.data}, isLoading: false })
                    }
                );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            username,
            name,
            email,
            pw,
            pw2,
            tax_number,
            city,
            fullAddress,
            errors ,
            isLoading
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Company Sign Up</h1>
                { errors.response && <div className="alert alert-danger">{errors.response}</div> }

                <TextFieldGroup
                    field="username"
                    label="Username"
                    value={username}
                    error={errors.username}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="name"
                    label="Company name"
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="pw"
                    label="Password"
                    value={pw}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <TextFieldGroup
                    field="pw2"
                    label="Password re"
                    value={pw2}
                    error={errors.passwordConfirmation}
                    onChange={this.onChange}
                    type="password"
                />

                <TextFieldGroup
                    field="tax_number"
                    label="Tax Number"
                    value={tax_number}
                    error={errors.tax_number}
                    onChange={this.onChange}
                    type="number"
                />

                <TextFieldGroup
                    field="city"
                    label="City"
                    value={city}
                    error={errors.city}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="fullAddress"
                    label="Fully address"
                    value={fullAddress}
                    error={errors.fullAddress}
                    onChange={this.onChange}
                />
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>
                        Reg. Company
                    </button>
                </div>
            </form>
        );
    }
}

CompanySignUpForm.propTypes = {
    companySignUp: React.PropTypes.func.isRequired
}

CompanySignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { companySignUp })(CompanySignUpForm);