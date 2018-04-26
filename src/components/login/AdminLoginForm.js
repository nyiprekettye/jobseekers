
import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from "../../utils/validations/login.validation"
import {adminLogin} from "../../actions/admin.auth.action";
import {companyLogIn} from "../../actions/company.auth.action";

class AdminLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
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
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.adminLogin(this.state).then(
                (res) => {
                    if (res.status === 200){
                        this.context.router.history.push('/')
                    }else {
                        this.setState({errors: {response: res.request.response}, isLoading: false})
                    }
                },
                (err) => {
                    if(err.response.status&& parseInt(err.response.status) === 404 ){
                        this.setState({ errors:{response: "server is not available"}, isLoading: false });
                    }else {
                        console.log("err in login form:")
                        console.log(err)
                        this.setState({ errors:{response: err.response.data.errors}, isLoading: false })
                    }
                }
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Admin Login</h1>
                { errors.response && <div className="alert alert-danger">{errors.response}</div> }

                <TextFieldGroup
                    field="identifier"
                    label="Admin username:"
                    value={identifier}
                    error={errors.identifier}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
            </form>
        );
    }
}

AdminLoginForm.propTypes = {
    adminLogin: React.PropTypes.func.isRequired
}

AdminLoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { adminLogin })(AdminLoginForm);



