import React from 'react';
import { Link } from 'react-router-dom';
import SearchPage from "./SearchPage";
class IndexPage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Ez a főoldal!</h1>
                <SearchPage/>
            </div>
        );
    }
}

export default IndexPage;