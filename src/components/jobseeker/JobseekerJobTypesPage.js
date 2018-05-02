import React from 'react';
import {jobseekersLogout} from '../../actions/jobseeker.auth.action';
import {getJobTypes, delJobTpye, addNewJobTpye} from '../../actions/jobseekers.jobType.action';
import {connect} from "react-redux";
import classnames from "classnames";
class JobseekerJobTypesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 'initial',
            otherJobTypes : [],
            CurrentOtherJobTypes : '-1',
            taggedJobTypes: [],
            isLoadingInsertNewJobType :false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmitIsLoadingInsertNewJobType = this.onSubmitIsLoadingInsertNewJobType.bind(this);
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { jobseekers } = this.props.auth;
            this.props.getJobTypes(jobseekers.token).then(
                (resData) => {
                    //  resolve(res);
                    this.setState({
                        loading:false,
                        otherJobTypes:resData.data.otherJobTypes,
                        taggedJobTypes:resData.data.taggedJobTypes
                    });
                    //console.log(this.state);
                    resolve('This is my data.');
                },
                (err) => {
                    reject(err)
                }
            );
        });

        return promise;
    }

    componentDidMount() {
        this.setState({ loading: 'true' });
        this.loadData()
            .then((resData) => {
                //console.log(this.state);
            },(err) => {
                console.log(err);
                this.props.jobseekersLogout();
                this.context.router.history.push('/');
            });
    }

    reload(){
        this.setState({ loading: 'true' });
        this.loadData()
            .then((resData) => {
                //console.log(this.state);
            },(err) => {
                console.log(err);
                this.props.jobseekersLogout();
                this.context.router.history.push('/');
            });
    }

    onSubmitIsLoadingInsertNewJobType(e) {
        e.preventDefault();
        console.log(this.state.CurrentOtherJobTypes);
        this.setState({ loading: 'initial' });
        const { jobseekers } = this.props.auth;
        this.props.addNewJobTpye(this.state.CurrentOtherJobTypes, jobseekers.token).then(
            (resData) => {
                console.log(resData);
                this.reload();
            },
            (err) => {
                console.log(err);
                this.reload();
            }
        );

    }

    submintDeleteTaggedJobTypes(job_type_id){
        console.log('I will del :' + job_type_id +' this tagged job type');
        this.setState({ loading: 'initial' });
        const { jobseekers } = this.props.auth;
        this.props.delJobTpye(job_type_id, jobseekers.token).then(
            (resData) => {
                console.log(resData);
                this.reload();
            },
            (err) => {
                console.log(err);
                this.reload();
            }
        );
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {

        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }

        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }

        const {
            CurrentOtherJobTypes,
            isLoadingInsertNewJobType,
            taggedJobTypes,
            otherJobTypes} = this.state;

        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <h1>Jobseekers Job types</h1>
                </div>
                {
                    taggedJobTypes.map((taggedJobType,i) =>
                        <div className="col-md-10 col-md-offset-1" key={i}>
                          <span>{taggedJobType[1]}</span>
                            <button onClick={this.submintDeleteTaggedJobTypes.bind(this,taggedJobType[0])}>Del this tagged job type</button>
                        </div>
                    )
                }
                <div className={classnames('form-group')}>
                    <form onSubmit={this.onSubmitIsLoadingInsertNewJobType}>
                        <label className="control-label">Not jet tagged job types</label>
                        <select onChange={this.onChange} value={CurrentOtherJobTypes} name="CurrentOtherJobTypes">
                            <option value='-1'>Select</option>
                            {
                                otherJobTypes.map(otherJobType =>
                                    <option key={otherJobType[0]} value={otherJobType[0]}>
                                        {otherJobType[1]}
                                    </option>
                                )
                            }
                        </select>
                        <button className="btn btn-primary btn-lg" disabled={isLoadingInsertNewJobType}>
                            Tagged job type
                        </button>
                    </form>
                </div>


            </div>
        );
    }
}
JobseekerJobTypesPage.propTypes = {
    getJobTypes: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired,
    addNewJobTpye: React.PropTypes.func.isRequired,
    delJobTpye: React.PropTypes.func.isRequired
}

JobseekerJobTypesPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    getJobTypes,
    jobseekersLogout,
    addNewJobTpye,
    delJobTpye })(JobseekerJobTypesPage);



