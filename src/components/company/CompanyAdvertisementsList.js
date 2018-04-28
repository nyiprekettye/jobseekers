
import React from 'react';
import { companyLogout} from '../../actions/company.auth.action';
import {getAdvertisements, updateAdvertisementArchiveState} from '../../actions/company.jobAdvertisement.action';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
class CompanyAdvertisementsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            advertisements : [],
            loading_advertisiemets: 'initial'
        };
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            const { company } = this.props.auth;
            this.props.getAdvertisements(company.token).then(
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
                this.props.companyLogout();
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
                this.props.companyLogout();
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
            archive:archive
        }

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
    updateAdvertisementById(advertisement_id){
        this.context.router.history.push('/company-update-advertisment-by-id/'+advertisement_id);
    }
    color (inspected, archive) {
        if(inspected === 0 && archive ===0){
            return {backgroundColor: 'yellow'}
        }else  if(inspected === 0 && archive ===1){
            return {backgroundColor: 'gray'}
        } else  if(inspected === 1 && archive ===0){
            return {backgroundColor: 'green'}
        } else if(inspected === 1 && archive ===1){
            return {backgroundColor: 'gray'}
        }else if(inspected === -1 ){
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
        const inspectedAndNotArchive="style='backgroud-color:green'";
        const wrong="style='backgroud-color:red'";
        const archive="style='backgroud-color:gray'";
        const notInspected="style='backgroud-color:yellow'";

        return (
            <div className="col-md-10 col-md-offset-1">
                <h1>Company Advertisements</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job type</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>City</th>
                            <th>Date</th>
                            <th>Validate</th>
                            <th>Archive</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        advertisements.map((advertisement,i) =>
                            <tr key={i} style={this.color(advertisement[7],advertisement[8])} >
                                <td>{advertisement[2]}</td>
                                <td>{advertisement[3]}</td>
                                <td>{advertisement[4]}</td>
                                <td>{advertisement[5]}</td>
                                <td>{advertisement[6]}</td>
                                <td>{advertisement[7] === 1 ? 'true':'false'}</td>
                                <td>{advertisement[8] === 0 ?
                                    <button type="button" className="btn" onClick={
                                        this.archiveActive.bind(this, advertisement[0],1)
                                    }>Go to archive</button>
                                :
                                    <button type="button" className="btn"  onClick={
                                        this.archiveActive.bind(this, advertisement[0],0)
                                    }>Go to active</button>
                                }
                                </td>
                                <td>
                                    <button type="button" className="btn btn-warning"  onClick={
                                        this.updateAdvertisementById.bind(this, advertisement[0])
                                    }>edit</button>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>

            </div>
        );

    }
}
CompanyAdvertisementsList.propTypes = {
    companyLogout: React.PropTypes.func.isRequired,
    getAdvertisements: React.PropTypes.func.isRequired,
    updateAdvertisementArchiveState: React.PropTypes.func.isRequired
}

CompanyAdvertisementsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {
    companyLogout,
    getAdvertisements ,
    updateAdvertisementArchiveState
})(CompanyAdvertisementsList);



