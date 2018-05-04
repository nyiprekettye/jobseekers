import React from 'react';
import {getJobseekerRating, updateJobseekerRating} from '../../actions/company.jobseeker.action'
import {companyLogout} from '../../actions/company.auth.action'
import {connect} from "react-redux";

class CompanyJobseekerRating extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            asd:'',
            jobseekerId:this.props.jobseekerId,
            loading: 'initial',
            jobsekkerRating:0,
            ownRating:10
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const {company} = this.props.auth;
            this.props.getJobseekerRating(
                {jobseekerId: this.state.jobseekerId},
                company.token
            ).then(
                (resData) => {
                    this.setState({
                        jobsekkerRating: resData.data[0][0],
                        loading: false
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: 'initial'
        });

        const { company } = this.props.auth;
        const data ={
            jobseekerId :this.state.jobseekerId,
            rating :this.state.ownRating
        }
        //console.log(data);
        this.props.updateJobseekerRating(data, company.token).then(
            (resData) => {
                //console.log(resData);
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

        const {ownRating} = this.state;

        return (
            <div className="jumbotron">
                <h2>Rating</h2>
                <p >
                    <strog>Az álláskereső összesített értékelése: </strog>
                    <span style={{'fontSize':'40px'}}>
                        {this.state.jobsekkerRating ? this.state.jobsekkerRating :'?'}
                        / 10</span>
                </p>
                <div>
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
                </div>
            </div>
        );
    }
}

CompanyJobseekerRating.propTypes = {
    getJobseekerRating: React.PropTypes.func.isRequired,
    updateJobseekerRating: React.PropTypes.func.isRequired,
    companyLogout: React.PropTypes.func.isRequired
};
CompanyJobseekerRating.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {companyLogout,getJobseekerRating,updateJobseekerRating })(CompanyJobseekerRating);
