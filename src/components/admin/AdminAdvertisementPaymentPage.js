
import React from 'react';
import { adminLogout} from '../../actions/admin.auth.action';
import {getPaymentsData} from '../../actions/admin.payments.action';
import {connect} from "react-redux";

class AdminAdvertisementPaymentPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payments:[],
            loading: 'initial'
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { admin } = this.props.auth;
            this.props.getPaymentsData(
                {},
                admin.token
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        payments:resData.data,
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
                console.log(err)
                this.props.adminLogout();
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
        const {payments, isLoading} =  this.state;


        return (
            <div className="col-md-10 col-md-offset-1">
                <h2>Advertisement payment section</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Min</th>
                            <th>AVG</th>
                            <th>MAx</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment,i) =>
                                <tr key={i} >
                                     <td>{payment[0]}</td>
                                     <td>{payment[1]}</td>
                                     <td>{payment[2]}</td>
                                     <td>{payment[3]}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );

    }
}
AdminAdvertisementPaymentPage.propTypes = {
    adminLogout: React.PropTypes.func.isRequired,
    getPaymentsData: React.PropTypes.func.isRequired
}

AdminAdvertisementPaymentPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    adminLogout,
    getPaymentsData
})(AdminAdvertisementPaymentPage);



