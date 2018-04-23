
import React from 'react';
import CompanySignUpForm from "./CompanySignUpForm"
class JobseekersSignUpPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <CompanySignUpForm />
                </div>
            </div>
        );
    }
}

export default JobseekersSignUpPage;