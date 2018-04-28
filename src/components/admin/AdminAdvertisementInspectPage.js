
import React from 'react';
import { companyLogout} from '../../actions/company.auth.action';
import {getAdvertisementById, updateAdvertisementInspectedById} from '../../actions/admin.advertisement.action';
import {connect} from "react-redux";

class AdminAdvertisementInspectPage extends React.Component {

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
            type : '',
            description: ''
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { admin } = this.props.auth;
            this.props.getAdvertisementById(
                {advertismenet_id:this.state.advertismenet_id},
                admin.token
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        name:resData.data[0],
                        description:resData.data[1],
                        city:resData.data[2],
                        type:resData.data[3],
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

    updateInspect(inspect_state){
        console.log('inspected state: '+ inspect_state);
        this.state.isLoading = true;

        const { admin } = this.props.auth;
        const data ={
            inspect_state :inspect_state,
            advertisement_id: parseInt(this.state.advertismenet_id)
        }
        console.log(data);
        this.props.updateAdvertisementInspectedById(data, admin.token).then(
            (resData) => {
                //console.log(resData.data);
                //console.log(this.state);
                this.context.router.history.push('/admin-panel');
            },
            (err) => {
                console.log(err);
                this.props.companyLogout();
                this.context.router.history.push('/admin-login');
            }
        );
    }
    render() {

        if (this.state.loading_advertisiemet === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading_advertisiemet === 'true') {
            return <h2>Loading...</h2>;
        }
        const {name, description, city, type, errors, isLoading} =  this.state;


        return (
            <div className="col-md-10 col-md-offset-1">
                <h2>Advertisement Inspect</h2>
                <div className="col-md-10 col-md-offset-1">
                    <span><strong>Name :</strong> {name}</span>
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <span><strong>city :</strong> {city}</span>
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <span><strong>Type :</strong> {type}</span>
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <span><strong>Description :</strong> {description}</span>
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <div className="col-md-3 col-md-offset-1">
                    <button type="button" className="btn btn-success" disabled={isLoading} onClick={
                                this.updateInspect.bind(this, 1)
                            }>
                        Accept</button>
                    </div>
                    <div className="col-md-3 col-md-offset-1">
                        <button type="button" className="btn btn-danger" disabled={isLoading} onClick={
                            this.updateInspect.bind(this, -1)
                        }>
                            Reject</button>
                    </div>
                </div>
            </div>
        );

    }
}
AdminAdvertisementInspectPage.propTypes = {
    companyLogout: React.PropTypes.func.isRequired,
    getAdvertisementById: React.PropTypes.func.isRequired,
    updateAdvertisementInspectedById: React.PropTypes.func.isRequired
}

AdminAdvertisementInspectPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    companyLogout,
    getAdvertisementById,
    updateAdvertisementInspectedById
})(AdminAdvertisementInspectPage);



