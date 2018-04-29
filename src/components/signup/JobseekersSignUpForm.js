
import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from "../../utils/validations/jobseekers.signup.validation"

import { jobseekerSignUp } from '../../actions/jobseeker.auth.action';
import classnames from "classnames";

class JobseekersSignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'asd',
            email: 'asd',
            pw: 'asd',
            pw2: 'asd',
            city: 'asd',
            birth: 'asd',
            errors: { asd:'asd'
            },
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
                name :this.state.username,
                email: this.state.email,
                pw: this.state.pw,
                city :this.state.city,
                birth :this.state.birth
            };

            this.props.jobseekerSignUp(data)
                .then(
                    () => {
                        this.context.router.history.push('/jobseekers-login')
                    },
                    (err) => {
                        this.setState({ errors:{response: err.response.data}, isLoading: false })
                    }
                );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        let years = [];

        for (let i=2014; i>1931; i--) {
            years.push(i);
        }

        const {
            username,
            email,
            pw,
            pw2,
            city,
            birth,
            errors ,
            isLoading
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Jobseekers Sign Up</h1>
                { errors.response && <div className="alert alert-danger">{errors.response}</div> }

                <TextFieldGroup
                    field="username"
                    label="Username"
                    value={username}
                    error={errors.username}
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
                    field="city"
                    label="City"
                    value={city}
                    error={errors.city}
                    onChange={this.onChange}
                />


                <div className={classnames('form-group', { 'has-error': errors.birth })}>
                    <label className="control-label">Job Types</label>
                    <select onChange={this.onChange}
                            value={birth}
                            name="birth">
                        <option value='-1'>Select</option>
                        {
                            years.map(year =>
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            )
                        }
                    </select>
                    {
                        errors.current_job_type && <span className="help-block">
                                {errors.current_job_type}
                            </span>
                    }
                </div>

                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Register</button></div>
            </form>
        );
    }
}

JobseekersSignUpForm.propTypes = {
    jobseekerSignUp: React.PropTypes.func.isRequired
}

JobseekersSignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { jobseekerSignUp })(JobseekersSignUpForm);