import React from 'react';
import { Link } from 'react-router-dom';
class Greetings extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Hi!</h1>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/company-add-new-advertisment">Company - Add new job advertisment</Link></li>
                </ul>
            </div>
        );
    }
}

export default Greetings;