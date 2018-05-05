import React from 'react';
import classnames from "classnames";
import validateInput from "../../utils/validations/jobseekers.CV.validation";
import {jobseekerAddNewCV} from "../../actions/jobseeker.CV.action";
import {connect} from "react-redux";
import {jobseekersLogout} from "../../actions/jobseeker.auth.action";
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';

class JobseekerAddNewCVPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'ASD',
            language: 'HUN',
            content: 'asd',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    isValid() {

        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;

    }

    onSubmit(e) {
        console.log(this.state);
        e.preventDefault();


        if (this.isValid()) {
            this.state.errors = {};
            this.state.isLoading =true;
            //console.log(this.state);

            const { jobseekers } = this.props.auth;
            const data = {
                name : this.state.name,
                language : this.state.language,
                content : this.state.content
            }

            this.props.jobseekerAddNewCV(jobseekers.token, data).then(
                (res) => {
                    console.log(res);
                    if (res.status === 200){

                        this.context.router.history.push('/jobseeker-profil')
                    }else {
                        console.log(res);
                        this.setState({errors: {response: res.request.response}, isLoading: false})
                    }
                },
                (err) => {
                    if(err.response.status&& parseInt(err.response.status) === 404 ){
                        this.setState({ errors:{response: "server is not available"}, isLoading: false });
                    }else if(err.response.status&& parseInt(err.response.status) === 401 ) {
                        this.setState({ errors:{response: err.response.data.errors}, isLoading: false })
                        this.context.router.history.push('/jobseeker-login')
                    }else {
                        console.log("err in form:")
                        console.log(err)
                        this.setState({ errors:{response: err.response.data.errors}, isLoading: false })
                    }
                }
            );

        }

    }

    render() {

        const {name, language, content, errors, isLoading} = this.state;
        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <h1>Add new CV page</h1>
                    itt legyen a form amiben elküdöd az új cv adatokat a szervernek
                    hívd meg a jobbseeker.cv.action fáljból a jobseekerAddNewCV fgv
                    küldd el neki a megfelelő adatokat
                    ha megfelelő 200 statusszal tér vissza a fgv akkor irány a /jobseeler-profil
                    ha nem akkor a login/ reg ben látható módon
                    jelenjen meg felül a megfelelő hibaüzenet a szervertől
                </div>
                <form onSubmit={this.onSubmit}>
                    <h1>Jobseeker add new CV </h1>
                    { errors.response && <div className="alert alert-danger">{errors.response}</div> }

                    <TextFieldGroup
                        field="name"
                        label="name"
                        value={name}
                        error={errors.name}
                        onChange={this.onChange}
                    />

                    <div className={classnames('form-group', { 'has-error': errors.language })}>
                        <label className="control-label">Language</label>
                        <select onChange={this.onChange}
                                value={language}
                                name="current_job_type">
                            <option value='HUN'>MAGYAR</option>
                            <option value='ENG'>ANGOL</option>

                        </select>
                    </div>

                    <TextareaFieldGroup
                        field="content"
                        label="Content"
                        value={content}
                        error={errors.content}
                        onChange={this.onChange}
                    />





                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" disabled={isLoading}>
                            New job CV
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

JobseekerAddNewCVPage.propTypes = {
    jobseekerAddNewCV: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired
};

JobseekerAddNewCVPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    jobseekerAddNewCV,
    jobseekersLogout })(JobseekerAddNewCVPage);
