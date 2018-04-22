
import React from 'react';

import {jobseekerGetData, jobseekersLogout} from '../../actions/jobseeker.action';
import {connect} from "react-redux";
class JobseekersProfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 'initial',
            username: '',
            email: '',
            city: '',
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { jobseekers } = this.props.auth;
            this.props.jobseekerGetData(jobseekers.token).then(
                (resData) => {
                  //  resolve(res);
                    this.setState({
                        username:resData.data.username,
                        email:resData.data.email,
                        city:resData.data.city,
                        loading: 'false'
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

    render() {

        if (this.state.loading === 'initial') {
           return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }

        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h1>Jobseekers Profil</h1>
                </div>
                <div className="col-md-4 col-md-offset-4">
                    <span><strong>Username :</strong> {this.state.username}</span>
                </div>
                <div className="col-md-4 col-md-offset-4">
                    <span><strong>Email : </strong>{this.state.email}</span>
                </div>
                <div className="col-md-4 col-md-offset-4">
                    <span><strong>Eity : </strong>{this.state.city}</span>
                </div>
            </div>
        );
    }
}
JobseekersProfil.propTypes = {
    jobseekerGetData: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired
}

JobseekersProfil.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, { jobseekerGetData, jobseekersLogout })(JobseekersProfil);



