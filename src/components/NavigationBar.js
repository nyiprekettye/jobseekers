
import React from 'react';
import { Link } from 'react-router';

class NavigationBar extends React.Component {


    render() {

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Job protal</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        {guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}
export default NavigationBar