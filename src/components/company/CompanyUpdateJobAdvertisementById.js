
import React from 'react';
import { companyLogout} from '../../actions/company.auth.action';
import {getAdvertisementById, updateAdvertisementById} from '../../actions/company.jobAdvertisement.action';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import classnames from "classnames";
import validateInput from "../../utils/validations/company.updateAdvertisement.validation";
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
class CompanyUpdateJobAdvertisementById extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            advertismenet_id: this.props.match.params.id,
            advertisement : [],
            loading_advertisiemet: 'initial',
            errors:{},
            isLoading: false,
            name : '',
            city : '',
            description: '',
            payment: ''
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { company } = this.props.auth;
            this.props.getAdvertisementById(
                {advertismenet_id:this.state.advertismenet_id},
                company.token
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        name:resData.data[0],
                        description:resData.data[1],
                        city:resData.data[2],
                        payment:resData.data[3],
                        loading_advertisiemet: 'false'
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
                console.log(err)
                this.props.companyLogout();
                this.context.router.history.push('/');
            });
    }


    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            console.log(this.state);
            //this.setState({ errors: {}, isLoading: true });

            console.log(this.state);
            const { company } = this.props.auth;
            const data = {
                advertismenet_id: this.state.advertismenet_id,
                name : this.state.name,
                description : this.state.description,
                city : this.state.city,
                payment : this.state.payment
            }
            this.props.updateAdvertisementById(data, company.token).then(
                (res) => {
                    console.log(res);
                    if (res.status === 200){

                        this.context.router.history.push('/company-profil')
                    }else {
                        console.log(res);
                        this.setState({errors: {response: res.request.response}, isLoading: false})
                    }
                },
                (err) => {
                    if(err.response.status&& parseInt(err.response.status) === 404 ){
                        this.setState({ errors:{response: "server is not available"}, isLoading: false });
                    }else if(err.response.status&& parseInt(err.response.status) === 401 ) {
                        this.setState({ errors:{response: err.response.data.errors}, isLoading: false })
                        this.context.router.history.push('/company-login')
                    }else {
                        console.log("err in form:")
                        console.log(err)
                        this.setState({ errors:{response: err.response.data.errors}, isLoading: false })
                    }
                }
            );

        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        if (this.state.loading_advertisiemet === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading_advertisiemet === 'true') {
            return <h2>Loading...</h2>;
        }
        const {name, description, city, payment, errors, isLoading} =  this.state;


        return (
            <div className="col-md-10 col-md-offset-1">
                <form onSubmit={this.onSubmit}>
                    <h1>Company update Advertisement</h1>
                    { errors.response && <div className="alert alert-danger">{errors.response}</div> }

                    <TextFieldGroup
                        field="name"
                        label="name"
                        value={name}
                        error={errors.name}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        field="city"
                        label="City"
                        value={city}
                        error={errors.city}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        field="payment"
                        label="Payment (not public)"
                        value={payment}
                        error={errors.payment}
                        onChange={this.onChange}
                        type="number"
                    />

                    <TextareaFieldGroup
                        field="description"
                        label="Description"
                        value={description}
                        error={errors.description}
                        onChange={this.onChange}
                    />


                    <div className="form-group">
                        <button className="btn btn-warning" disabled={isLoading}>
                            Update advertisment
                        </button>
                    </div>
                </form>
            </div>
        );

    }
}
CompanyUpdateJobAdvertisementById.propTypes = {
    companyLogout: React.PropTypes.func.isRequired,
    getAdvertisementById: React.PropTypes.func.isRequired,
    updateAdvertisementById: React.PropTypes.func.isRequired
}

CompanyUpdateJobAdvertisementById.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    companyLogout,
    getAdvertisementById ,
    updateAdvertisementById
})(CompanyUpdateJobAdvertisementById);



