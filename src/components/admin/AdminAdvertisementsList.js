
import React from 'react';
import {adminLogout} from '../../actions/admin.auth.action';
import {getAdvertisements} from '../../actions/admin.advertisement.action';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
class AdminAdvertisementsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            advertisements : [],
            loading_advertisiemets: 'initial'
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { admin } = this.props.auth;
            this.props.getAdvertisements(admin.token).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        advertisements:resData.data,
                        loading_advertisiemets: 'false'
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
                this.props.adminLogout();
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
                this.props.adminLogout();
                this.context.router.history.push('/');
            });
    }

    archiveActive( advertisement_id, archive) {
        this.setState({
            advertisements:[],
            loading_advertisiemets: 'initial'
        });

        const { company } = this.props.auth;
        const data ={
            advertisement_id :advertisement_id,
            archive_status:archive
        }
        console.log(data);
        this.props.updateAdvertisementArchiveState(data, company.token).then(
            (resData) => {
                //console.log(resData.data);
                //console.log(this.state);
                console.log(resData);
                this.reload();
            },
            (err) => {
                console.log(err);
                this.reload();
            }
        );


    }

    inspectAdvertisementById(advertisement_id){
        this.context.router.history.push('/admin-inspect-advertisment-by-id/'+advertisement_id);
    }

    color (inspected, archive) {
        if(inspected === '0' && archive === '0'){
            return {backgroundColor: 'yellow'}
        }else  if(inspected === '0' && archive === '1'){
            return {backgroundColor: 'gray'}
        } else  if(inspected === '1' && archive ==='0'){
            return {backgroundColor: 'green'}
        } else if(inspected === '1' && archive ==='1'){
            return {backgroundColor: 'gray'}
        }else if(inspected === '-1' ){
            return {backgroundColor: 'red'}
        }
    }

    render() {

        if (this.state.loading_advertisiemets === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading_advertisiemets === 'true') {
            return <h2>Loading...</h2>;
        }
        const {advertisements} =  this.state;

        return (
            <div className="col-md-10 col-md-offset-1">
                <h1>Admin Advertisements List</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Job type</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>City</th>
                        <th>Date</th>
                        <th>Validate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        advertisements.map((advertisement,i) =>
                            <tr key={i} style={this.color(advertisement[3],advertisement[4])} >

                                <td>{advertisement[5]}</td>
                                <td>{advertisement[6]}</td>
                                <td>{advertisement[7]}</td>
                                <td>{advertisement[8]}</td>
                                <td>{advertisement[9]}</td>
                                <td>{advertisement[10] === "1" ? 'true':'false'}</td>
                                <td>
                                    <button type="button" className="btn btn-warning"  onClick={
                                        this.inspectAdvertisementById.bind(this, advertisement[0])
                                    }>Inspect</button>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>

            </div>
        );

    }
}
AdminAdvertisementsList.propTypes = {
    adminLogout: React.PropTypes.func.isRequired,
    getAdvertisements: React.PropTypes.func.isRequired
}

AdminAdvertisementsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    adminLogout,
    getAdvertisements
})(AdminAdvertisementsList);



