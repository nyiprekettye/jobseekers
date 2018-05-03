import React from 'react';
import {getJobseekerById} from '../../actions/company.jobseeker.action'
import {companyLogout} from '../../actions/company.auth.action'
import {connect} from "react-redux";

class CompanyJobseekerProfil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobseekerId: this.props.match.params.jobseekerId,
            jobsekker : [],
            loading: 'initial'
        };

    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { company } = this.props.auth;
            this.props.getJobseekerById(
                {jobseekerId:this.state.jobseekerId},
                company.token
            ).then(
                (resData) => {
                    this.setState({
                        jobsekker:resData.data[0],
                        loading:false
                    });
                    // console.log(this.state);
                    resolve('This is my data.');

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

    render() {

        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        const {jobAdvertisement, jobsekker} =  this.state;
        return (
            <div className="jumbotron">
                <h2>Hirdetés oldala!</h2>
                <div className="list-group">

                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Name: </strong>{jobsekker[1]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>email: </strong>{jobsekker[2]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>City: </strong>{jobsekker[3]}</p>
                    </span>

                </div>
            </div>
        );
    }
}


CompanyJobseekerProfil.propTypes = {
    getJobseekerById: React.PropTypes.func.isRequired,
    companyLogout: React.PropTypes.func.isRequired
};

CompanyJobseekerProfil.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    getJobseekerById,
    companyLogout })(CompanyJobseekerProfil);
