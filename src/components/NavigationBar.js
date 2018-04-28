
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.action';
import { jobseekersLogout } from '../actions/jobseeker.auth.action';
import { companyLogout } from '../actions/company.auth.action';
import { adminLogout } from '../actions/admin.auth.action';

class NavigationBar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.context.router.history.push('/')
    }
    jobseekersLogout(e) {
        e.preventDefault();
        this.props.jobseekersLogout();
        this.context.router.history.push('/')
    }
    companyLogout(e) {
        e.preventDefault();
        this.props.companyLogout();
        this.context.router.history.push('/')
    }
    adminLogout(e) {
            e.preventDefault();
            this.props.adminLogout();
            this.context.router.history.push('/')
        }

    render() {
        const {
            isAuthenticated,
            jobseekersIsAuthenticated,
            jobseekersName,
            companyIsAuthenticated,
            companyName,
            adminIsAuthenticated
        } = this.props.auth;
        const jobseekersLinks= (
            <ul className="nav navbar-nav navbar-right">
                <li><div className="navbar-brand">Welcome {jobseekersName}!</div></li>
                <li><Link to="/jobseeler-profil">Jobseeker Profil</Link></li>
                <li><a href="#" onClick={this.jobseekersLogout.bind(this)}>Logout jobseeker!</a></li>
            </ul>
        );

        const companyLinks= (
            <ul className="nav navbar-nav navbar-right">
                <li><div className="navbar-brand">Welcome cég: {companyName}!</div></li>
                <li><Link to="/company-profil">Company Profil</Link></li>
                <li><a href="#" onClick={this.companyLogout.bind(this)}>Logout Company!</a></li>
            </ul>
        );

        const  userLinks  = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logout.bind(this)}>Logout User!</a></li>
            </ul>
        );
        const  adminLinks  = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/admin-panel">Admin panel</Link></li>
                <li><a href="#" onClick={this.adminLogout.bind(this)}>Logout ADMIN!</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><div className="navbar-brand">Welcome {jobseekersName}!</div></li>
                <li><Link to="/sigli">Sign up</Link></li>
                <li><Link to="/admin-login">admin-login</Link></li>
                <li><Link to="/jobseekers-signup">jobseekers-Sign Up</Link></li>
                <li><Link to="/jobseekers-login">jobseekers-login</Link></li>
                <li><Link to="/company-signup">company-SignUp</Link></li>
                <li><Link to="/company-login">company-login</Link></li>
            </ul>
        );
        const authSomebody = (
            <div>
                <span>
                    { jobseekersIsAuthenticated ? jobseekersLinks : '' }
                    { companyIsAuthenticated ? companyLinks : '' }
                    { isAuthenticated ? userLinks : '' }
                    { adminIsAuthenticated ? adminLinks : '' }
                </span>
            </div>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Red Dice</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        {jobseekersIsAuthenticated}
                        { ( isAuthenticated
                            || jobseekersIsAuthenticated
                            || companyIsAuthenticated
                            || adminIsAuthenticated )
                            ? authSomebody : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired,
    jobseekersLogout: React.PropTypes.func.isRequired,
    adminLogout: React.PropTypes.func.isRequired,
    companyLogout: React.PropTypes.func.isRequired
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, {
    logout,
    jobseekersLogout,
    adminLogout,
    companyLogout
})(NavigationBar);