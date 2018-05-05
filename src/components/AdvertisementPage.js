import React from 'react';
import SearchPage from "./SearchPage";
import {getAdvertisementById} from '../actions/anonymous.advertisement.action'
import {getApllyJob, insertNewApplyJob, delApplyJob} from '../actions/jobseeker.applyJob.action';
import {jobseekersLogout} from '../actions/jobseeker.auth.action';
import {connect} from "react-redux";

class AdvertisementPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobAdvertisementId: this.props.match.params.advertisement_id,
            jobAdvertisement : [],
            loading: 'initial',
            isLogJobseeker : false,
            jobseeker : '',
            applyJob:''
        };
        const { jobseekers } = this.props.auth;
        if (jobseekers.token){
            this.state.isLogJobseeker = true;
            this.state.jobseeker = jobseekers
        }

    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            this.props.getAdvertisementById(
                {jobAdvertisementId:this.state.jobAdvertisementId}
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        jobAdvertisement:resData.data
                    });
                    if(this.state.isLogJobseeker){
                        this.props.getApllyJob(
                            {jobAdvertisementID:this.state.jobAdvertisementId},
                            this.state.jobseeker.token
                        ).then(
                            (resData) => {
                                //console.log(resData.data);
                                this.setState({
                                    applyJob:resData.data,
                                    loading:false
                                });
                               // console.log(this.state);
                                resolve('This is my data.');
                            },
                            (err2) => {
                                this.setState({
                                    loading:false
                                });
                                reject(err2)
                            }
                        );
                    }else {
                        this.setState({
                            loading:false
                        });
                        resolve('This is my data.');
                    }
                },
                (err2) => {
                    reject(err2)
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
                console.log(err)
                this.props.jobseekersLogout();
            });
    }

    openCompany(company_id){
        this.context.router.history.push('/company/'+company_id);
    }

    insertNewApplyJob(){
        console.log('insert');
        this.setState({
            loading: 'initial'
        });
        console.log(this.state);
        console.log(this.state.jobAdvertisementId);
        console.log(this.props.match.params.advertisement_id);

        this.props.insertNewApplyJob(
            {jobAdvertisementId :this.props.match.params.advertisement_id}
            , this.state.jobseeker.token).then(
            (resData) => {
                console.log(resData);
                this.loadData();
            },
            (err) => {
                console.log(err);
                this.loadData();
            }
        );
    }

    delApllyJob(apply_job_id){
        console.log('del: '+apply_job_id);
        this.setState({
            loading: 'initial'
        });
        this.props.delApplyJob(
            {applyJobId :apply_job_id}
            , this.state.jobseeker.token).then(
            (resData) => {
                console.log(resData);
                this.loadData();
            },
            (err) => {
                console.log(err);
                this.loadData();
            }
        );
    }

    render() {

        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        const {jobAdvertisement, errors, isLoading, isLogJobseeker, applyJob} =  this.state;
        return (
            <div className="jumbotron">
                <h2>Hirdetés oldala!</h2>
                <div className="list-group">

                    <span className="list-group-item">
                        <h3 className="list-group-item-heading"><strong><u>{jobAdvertisement[1]}</u></strong></h3>
                    </span>
                    <span className="list-group-item" >
                        <p className="list-group-item-text"><strong>Type: </strong>{jobAdvertisement[8]}</p>
                        <p className="list-group-item-text">
                            <button className="btn btn-info" onClick={this.openCompany.bind(this, jobAdvertisement[5])}>
                                Open Company
                            </button>
                        </p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>DATE: </strong>{jobAdvertisement[3]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Company name: </strong>{jobAdvertisement[6]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>City: </strong>{jobAdvertisement[2]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Description: </strong>{jobAdvertisement[4]}</p>
                    </span>
                    {
                        isLogJobseeker === true?
                            <span className="list-group-item">
                                {
                                    typeof applyJob[0] === 'undefined'  ?
                                        <button type="button" className="btn btn-success"  onClick={
                                            this.insertNewApplyJob.bind(this)
                                        }>Apply job</button>
                                        :
                                        <button type="button" className="btn btn-warning"  onClick={
                                            this.delApllyJob.bind(this, applyJob[0][0])
                                        }>Del Aplly job</button>
                                }
                            </span>
                            :
                            <p>Need to login to apply to job!</p>
                    }
                </div>
            </div>
        );
    }
}


AdvertisementPage.propTypes = {
    getAdvertisementById: React.PropTypes.func.isRequired,
    getApllyJob: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired,
    delApplyJob: React.PropTypes.func.isRequired,
    insertNewApplyJob: React.PropTypes.func.isRequired
};

AdvertisementPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    getAdvertisementById,
    getApllyJob,
    insertNewApplyJob,
    delApplyJob,
    jobseekersLogout })(AdvertisementPage);
