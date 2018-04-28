
import React from 'react';
import {companyGetData, companyLogout} from '../../actions/company.auth.action';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import CompanyAdvertisementsList from'../../components/company/CompanyAdvertisementsList';
class CompanyProfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 'initial',
            username: '',
            name: '',
            email: '',
            tax_number: '',
            city: '',
            address: '',
            reg_date: '',
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { company } = this.props.auth;
            this.props.companyGetData(company.token).then(
                (resData) => {
                    //  resolve(res);
                    this.setState({
                        username:resData.data.username,
                        name:resData.data.name,
                        email:resData.data.email,
                        tax_number:resData.data.tax_number,
                        city:resData.data.city,
                        address:resData.data.address,
                        loading: 'false'
                    });
                    //console.log(this.state);

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
                this.props.companyLogout();
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
            <div>
                <div className="row">
                    <div >
                        <h1>Company Profil</h1>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <span><strong>Username :</strong> {this.state.username}</span>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <span><strong>Name :</strong> {this.state.name}</span>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <span><strong>Email : </strong>{this.state.email}</span>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <span><strong>Tax Number : </strong>{this.state.tax_number}</span>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <span><strong>City : </strong>{this.state.city}</span>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <span><strong>Address : </strong>{this.state.address}</span>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <h1>Linkek</h1>
                        <ul className="nav navbar-nav navbar-left">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/company-add-new-advertisment">Add new job advertisement</Link></li>
                        </ul>
                    </div>



                </div>
                <CompanyAdvertisementsList/>
            </div>
        );
    }
}
CompanyProfil.propTypes = {
    companyGetData: React.PropTypes.func.isRequired,
    companyLogout: React.PropTypes.func.isRequired
}

CompanyProfil.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, { companyGetData, companyLogout })(CompanyProfil);



