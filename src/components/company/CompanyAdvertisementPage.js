import React from 'react';
import {getAdvertisementById} from '../../actions/company.jobAdvertisement.action'
import {getApllyJobs, updateApllyJob} from '../../actions/company.applyjob.action'
import {companyLogout} from '../../actions/company.auth.action'
import {connect} from "react-redux";

class CompanyAdvertisementPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobAdvertisementId: this.props.match.params.advertisement_id,
            jobAdvertisement : [],
            loading: 'initial',
            applyJobs:[]
        };

    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { company } = this.props.auth;
            this.props.getAdvertisementById(
                {advertismenet_id:this.state.jobAdvertisementId},
                company.token
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        jobAdvertisement:resData.data
                    });

                    this.props.getApllyJobs(
                        {jobAdvertisementId:this.state.jobAdvertisementId},
                        company.token
                    ).then(
                        (resData) => {
                            //console.log(resData.data);
                            this.setState({
                                applyJobs:resData.data,
                                loading:false
                            });
                            // console.log(this.state);
                            resolve('This is my data.');
                        },
                        (err2) => {
                            reject(err2)
                        }
                    );

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
                this.props.companyLogout();
                this.context.router.history.push('/company-login')
            });
    }

    updateApllyJob(applyJobId, state){
        this.setState({
            loading: 'initial'
        });

        const { company } = this.props.auth;
        const data ={
            applyJobId :applyJobId,
            applyJobState:state
        }
        console.log(data);
        this.props.updateApllyJob(data, company.token).then(
            (resData) => {
                //console.log(resData.data);
                //console.log(this.state);
                //console.log(resData);
                this.loadData();
            },
            (err) => {
                console.log(err);
                this.loadData();
            }
        );

    }

    color (isAccept) {
        if(isAccept === '0'){
            return {backgroundColor: 'yellow'}
        } else  if(isAccept === '1' ){
            return {backgroundColor: 'green'}
        } else  if(isAccept === '-1' ){
            return {backgroundColor: 'red'}
        }
    }

    getJobseekerInfo(jobseeker_id){
        this.context.router.history.push('/company-get-jobseeker/'+jobseeker_id);
    }
    render() {

        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        const {jobAdvertisement, errors, isLoading, isLogJobseeker, applyJobs} =  this.state;
        return (
            <div className="jumbotron">
                <h2>Hirdetés oldala!</h2>
                <div className="list-group">

                    <span className="list-group-item">
                        <h3 className="list-group-item-heading"><strong><u>{jobAdvertisement[0]}</u></strong></h3>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Name: </strong>{jobAdvertisement[1]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Description: </strong>{jobAdvertisement[2]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>City: </strong>{jobAdvertisement[3]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Payment: (not public)</strong>{jobAdvertisement[4]}</p>
                    </span>
                    <span className="list-group-item">
                        <h3>Apllied jobseekers:</h3>
                        {
                            typeof applyJobs[0] !== 'undefined'  ?
                                applyJobs.map((applyJob,i) =>
                                    <span className="list-group-item" key={i} style={this.color(applyJob[3])}>
                                         <p className="list-group-item-text">
                                             <strong>Jobseeker name: </strong>{applyJob[4]}
                                             {
                                                 applyJob[3] === '0'?
                                                     <span>
                                                         <button className="btn btn-success" onClick={
                                                             this.updateApllyJob.bind(this, applyJob[0], 1)
                                                         }>
                                                             Accept
                                                         </button>
                                                        <button className="btn btn-warning" onClick={
                                                            this.updateApllyJob.bind(this, applyJob[0], -1)
                                                        }>
                                                             Reject
                                                         </button>
                                                     </span>
                                                     :
                                                     ''
                                             }
                                             {
                                                applyJob[3] === '1'? <span>
                                                     <button className="btn btn-warning" onClick={
                                                         this.updateApllyJob.bind(this, applyJob[0], -1)
                                                     }>
                                                             Reject
                                                         </button>
                                                </span> : ''
                                             }
                                             {
                                                applyJob[3] === '-1'? <span>
                                                     <button className="btn btn-success" onClick={
                                                         this.updateApllyJob.bind(this, applyJob[0], 1)
                                                     }>
                                                             Accept
                                                         </button>
                                                </span> : ''
                                             }
                                         </p>
                                         <p className="list-group-item-text">
                                             <button className="btn btn-success" onClick={
                                                 this.getJobseekerInfo.bind(this, applyJob[1])
                                             }>
                                               Info
                                             </button>
                                         </p>
                                    </span>
                                )
                                :
                                'nobody has apllied yet '
                        }
                    </span>

                </div>
            </div>
        );
    }
}


CompanyAdvertisementPage.propTypes = {
    getAdvertisementById: React.PropTypes.func.isRequired,
    getApllyJobs: React.PropTypes.func.isRequired,
    updateApllyJob: React.PropTypes.func.isRequired,
    companyLogout: React.PropTypes.func.isRequired
};

CompanyAdvertisementPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    getAdvertisementById,
    getApllyJobs,
    updateApllyJob,
    companyLogout })(CompanyAdvertisementPage);
