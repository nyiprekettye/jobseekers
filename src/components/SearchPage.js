import React from 'react';
import { Link } from 'react-router-dom';
import TextFieldGroup from './common/TextFieldGroup';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            errors:{},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
       // console.log(this.state.searchText);
        window.location.href= "/search/"+this.state.searchText
        //this.context.router.history.push('/search/'+this.state.searchText+'')
    }
    render() {
        const {searchText, errors,isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                 <input type='text'
                       name='searchText'
                       onChange={this.onChange} value={searchText} />


                    <button className="btn btn-primary btn-lg" disabled={isLoading}>
                        Search
                    </button>

            </form>
        );
    }
}

SearchPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SearchPage;