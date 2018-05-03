import React from 'react';
import {jobseekersLogout} from '../../actions/jobseeker.auth.action';
import {getApllyJobs} from '../../actions/jobseeker.applyJob.action';
import {connect} from "react-redux";
import classnames from "classnames";
class JobseekerApplyJobList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 'initial',
            applyJobs : [],
        };
      }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { jobseekers } = this.props.auth;
            this.props.getApllyJobs({},jobseekers.token).then(
                (resData) => {
                    //  resolve(res);
                    this.setState({
                        loading:false,
                        applyJobs:resData.data,
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
    getJobAdvertisement(advertisement_id){
        this.context.router.history.push('/advertisement/'+advertisement_id);
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
    render() {

        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }

        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }

        const {applyJobs} = this.state;

        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <h3>Jobseekers apply jobs</h3>
                </div>
                <div  className="col-md-10 col-md-offset-1">
                {
                    applyJobs.map((applyJob,i) =>
                        <div key={i} style={this.color(applyJob[3])}>
                            <p className="list-group-item-text"><strong>
                                Name: </strong>
                                {applyJob[4]}
                                <button className="btn btn-info" onClick={
                                    this.getJobAdvertisement.bind(this, applyJob[2])
                                }>
                                    Info
                                </button>
                                </p>
                        </div>
                    )
                }
                </div>



            </div>
        );
    }
}
JobseekerApplyJobList.propTypes = {
    getApllyJobs: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired
}

JobseekerApplyJobList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    getApllyJobs,
    jobseekersLogout })(JobseekerApplyJobList);



