
import React from 'react';
import { jobseekersLogout} from '../../actions/jobseeker.auth.action';

import {getCVsById, delCVById} from '../../actions/jobseeker.CV.action';
import {connect} from "react-redux";
class JobseekerCVListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cvs : [],
            loading: 'initial'
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { jobseekers } = this.props.auth;
            this.props.getCVsById(jobseekers.token).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        cvs:resData.data,
                        loading: 'false'
                    });
                    //console.log(this.state);
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
                console.log(err);
                this.props.companyLogout();
                this.context.router.history.push('/jobseekers-login');
            });
    }

    reload(){
        this.setState({ loading: 'true' });
        this.loadData()
            .then((resData) => {
                //console.log(this.state);
            },(err) => {
                console.log(err);
                this.props.companyLogout();
                this.context.router.history.push('/');
            });
    }

    delCVById(cvId) {
        this.setState({
            advertisements:[],
            loading_advertisiemets: 'initial'
        });

        const { jobseekers } = this.props.auth;
        this.props.delCVById({cvId :cvId}, jobseekers.token).then(
            (resData) => {
                //console.log(resData.data);
                //console.log(this.state);
                console.log(resData);
                this.reload();
            },
            (err) => {
                console.log(err);
                //this.reload();
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
        const {cvs} =  this.state;

        return (
            <div className="col-md-10 col-md-offset-1">
                <h2>Jobseekers CVs</h2>
                <div className="list-group">
                    {
                        cvs.map((cv,i) =>
                            <span key={i} className="list-group-item" style={{'cursor':'pointer'}}>
                                 <p className="list-group-item-text"><strong>Name: </strong>{cv[2]}</p>
                                <p className="list-group-item-text"><strong>Language: </strong>{cv[3]}</p>
                                <p className="list-group-item-text"><strong>Content: </strong>{cv[4]}</p>
                                <p className="list-group-item-text">
                                    <button type="button" className="btn btn-warning"  onClick={
                                        this.delCVById.bind(this, cv[0])
                                    }>DELETE</button>
                                </p>
                            </span>
                        )
                    }
                </div>
            </div>
        );

    }
}
JobseekerCVListPage.propTypes = {
    jobseekersLogout: React.PropTypes.func.isRequired,
    getCVsById: React.PropTypes.func.isRequired,
    delCVById: React.PropTypes.func.isRequired
}

JobseekerCVListPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    jobseekersLogout,
    delCVById,
    getCVsById
})(JobseekerCVListPage);



