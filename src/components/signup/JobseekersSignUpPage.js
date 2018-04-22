
import React from 'react';
import JobseekersSignUpForm from "./JobseekersSignUpForm"
class JobseekersSignUpPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <JobseekersSignUpForm />
                </div>
            </div>
        );
    }
}

export default JobseekersSignUpPage;