
import React from 'react';
import JobseekersLoginForm from './JobseekersLoginForm';

class JobseekersLoginPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <JobseekersLoginForm />
                </div>
            </div>
        );
    }
}

export default JobseekersLoginPage;