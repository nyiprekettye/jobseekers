import React from 'react';
import {getCompanyById, getCompanyRatingById} from '../actions/anonymous.company.manager'
import {jobseekersLogout} from '../actions/jobseeker.auth.action';
import {updateCompanyRating} from '../actions/jobseeker.company.action';
import {connect} from "react-redux";

class CompanyPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            companyId: this.props.match.params.company_id,
            company : [],
            companyRating : '',
            loading: 'initial',
            isLogJobseeker : false,
            jobseeker : '',
            applyJob:'',
            ownRating:10
        };

        const { jobseekers } = this.props.auth;
        if (jobseekers.token){
            this.state.isLogJobseeker = true;
            this.state.jobseeker = jobseekers
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            this.props.getCompanyById(
                {companyId:this.state.companyId}
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        company:resData.data
                    });

                    this.props.getCompanyRatingById(
                        {companyId:this.state.companyId}
                    ).then(
                        (resData) => {
                            //console.log(resData.data);
                            this.setState({
                                companyRating:resData.data[0][0],
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



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: 'initial'
        });

        const data ={
            companyId :this.state.companyId,
            rating :this.state.ownRating
        }

        this.props.updateCompanyRating(data, this.state.jobseeker.token).then(
            (resData) => {
                //console.log(resData);
                this.loadData();
            },
            (err) => {

                this.props.jobseekersLogout();
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
        const {company, isLogJobseeker, companyRating, ownRating} =  this.state;
        return (
            <div className="jumbotron">
                <h2>Hirdetés oldala!</h2>
                <div className="list-group">

                    <span className="list-group-item">
                        <h3 className="list-group-item-heading"><strong><u>{company[1]}</u></strong></h3>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>Tax number: </strong>{company[2]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>City: </strong>{company[3]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text"><strong>ADDRESS: </strong>{company[4]}</p>
                    </span>
                    <span className="list-group-item">
                        <p className="list-group-item-text">
                            <strong>Rating: </strong>
                            <spann style={{'fontSize':'40px'}}>
                                {companyRating? companyRating :'?'}
                            </spann>/10

                        </p>
                    </span>
                    {
                        isLogJobseeker === true?
                            <span className="list-group-item">
                                <p>Saját értékelés leadása:</p>
                                <form onSubmit={this.onSubmit}>
                                    <select name='ownRating' value={ownRating} onChange={this.onChange}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                    </select>
                                    <p>Ha volt előző értékelés, akkor az minden esetben törlésre kerül!</p>
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-lg" >
                                            Rating
                                        </button>
                                    </div>
                                </form>
                            </span>
                            :
                            <p>Need to login to to rating company!</p>
                    }
                </div>
            </div>
        );
    }
}


CompanyPage.propTypes = {
    getCompanyRatingById: React.PropTypes.func.isRequired,
    getCompanyById: React.PropTypes.func.isRequired,
    updateCompanyRating: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired
};

CompanyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    getCompanyRatingById,
    getCompanyById,
    updateCompanyRating,
    jobseekersLogout })(CompanyPage);
