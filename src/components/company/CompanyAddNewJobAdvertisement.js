import React from 'react';
import {connect} from "react-redux";
import {companyLogout} from "../../actions/company.auth.action"
import {getJobTypes} from '../../actions/company.jobType.action'
import {companyNewAdvertisement} from '../../actions/company.jobAdvertisement.action'
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import validateInput from "../../utils/validations/company.newJobAdvertisement.validation";
import classnames from "classnames";
class CompanyAddNewJobAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'It állás',
            city: 'Szeged',
            description: 'description value',
            current_job_type:'-1',
            job_types :[],
            errors: {},
            loadingJobAdvertisment:'initial',
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ loadingJobAdvertisment: 'true' });
        this.loadJobTypeData()
            .then((resData) => {
                this.setState({
                    job_types:JSON.parse(resData.request.response),
                    loadingJobAdvertisment: 'false'
                })
            },(err) => {
                this.setState({
                    loadingJobAdvertisment: 'false'
                })
                console.log(err);
                this.props.companyLogout();
                //this.context.router.history.push('/');
            })
    }

    loadJobTypeData() {
        let promise = new Promise((resolve, reject) => {
            const { company } = this.props.auth;
            this.props.getJobTypes(company.token).then(
                (resData) => {
                    //  resolve(res);
                    //console.log(this.state);
                    resolve(resData);
                },
                (err) => {
                    reject(err)
                }
            );
        });

        return promise;
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
            //this.setState({ errors: {}, isLoading: true });
            console.log(this.state);
            const { company } = this.props.auth;
            const data = {
                name : this.state.name,
                description : this.state.description,
                city : this.state.city,
                current_job_type: this.state.current_job_type
            }
            this.props.companyNewAdvertisement(company.token, data).then(
                (res) => {
                    console.log(res);
                    if (res.status === 200){

                        this.context.router.history.push('/')
                    }else {
                        console.log(res);
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

        if (this.state.loadingJobAdvertisment === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loadingJobAdvertisment === 'true') {
            return <h2>Loading...</h2>;
        }
        const { errors, name, city, job_types, current_job_type,description,isLoading } = this.state;

        return (
            <div className="row">

                <form onSubmit={this.onSubmit}>
                    <h1>Company add new advertisment </h1>
                    { errors.response && <div className="alert alert-danger">{errors.response}</div> }

                    <TextFieldGroup
                        field="name"
                        label="name"
                        value={name}
                        error={errors.name}
                        onChange={this.onChange}
                    />

                    <div className={classnames('form-group', { 'has-error': errors.current_job_type })}>
                        <label className="control-label">Job Types</label>
                        <select onChange={this.onChange}
                                value={current_job_type}
                                name="current_job_type">
                            <option value='-1'>Select</option>
                            {
                                job_types.map(job_type =>
                                    <option key={job_type.id} value={job_type.id}>
                                        {job_type.name}
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

                    <TextFieldGroup
                        field="city"
                        label="City"
                        value={city}
                        error={errors.city}
                        onChange={this.onChange}
                    />

                    <TextareaFieldGroup
                        field="description"
                        label="Description"
                        value={description}
                        error={errors.description}
                        onChange={this.onChange}
                    />


                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" disabled={isLoading}>
                            New job advertisment
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

CompanyAddNewJobAdvertisement.propTypes = {
    getJobTypes: React.PropTypes.func.isRequired,
    companyLogout: React.PropTypes.func.isRequired,
    companyNewAdvertisement: React.PropTypes.func.isRequired
}

CompanyAddNewJobAdvertisement.contextTypes = {
    router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps,{
    getJobTypes,
    companyLogout,
    companyNewAdvertisement
})(CompanyAddNewJobAdvertisement);
