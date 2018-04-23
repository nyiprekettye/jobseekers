
import React from 'react';
import CompanyLoginForm from './CompanyLoginForm';

class CompanyLoginPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <CompanyLoginForm />
                </div>
            </div>
        );
    }
}

export default CompanyLoginPage;