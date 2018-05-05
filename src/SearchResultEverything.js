import React from 'react';
import {getAllAdvertisements} from './actions/anonymous.advertisement.action';
import {connect} from "react-redux";

class SearchResultEverything extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobAdvertisements : [],
            loading: 'initial'
        };

    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            this.props.getAllAdvertisements(
                {}
            ).then(
                (resData) => {
                    //console.log(resData.data);
                    this.setState({
                        jobAdvertisements:resData.data,
                        loading:false
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
            });
    }

    openAdvertisement(advertisement_id){
        console.log(advertisement_id);
        this.context.router.history.push('/advertisement/'+advertisement_id);
    }

    render() {

        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        const {jobAdvertisements, errors, isLoading} =  this.state;
        return (
            <div className="jumbotron">
                <h2>Ez a keresési találat!</h2>
                <div className="list-group">
                    {
                        jobAdvertisements.map((jobAdvertisement,i) =>
                            <a key={i} className="list-group-item" style={{'cursor':'pointer'}}>
                                <h3 className="list-group-item-heading"><strong><u>{jobAdvertisement[1]}</u></strong></h3>
                                <p className="list-group-item-text"><strong>Type: </strong>{jobAdvertisement[6]}</p>
                                <p className="list-group-item-text"><strong>DATE: </strong>{jobAdvertisement[3]}</p>
                                <p className="list-group-item-text"><strong>Company name: </strong>{jobAdvertisement[4]}</p>
                                <p className="list-group-item-text"><strong>City: </strong>{jobAdvertisement[2]}</p>
                                <button type="button" className="btn btn-info"
                                        onClick={this.openAdvertisement.bind(this,jobAdvertisement[0])}>Open </button>
                            </a>
                        )
                    }
                </div>
            </div>
        );
    }
}


SearchResultEverything.propTypes = {
    getAllAdvertisements: React.PropTypes.func.isRequired
};
SearchResultEverything.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { getAllAdvertisements })(SearchResultEverything);
