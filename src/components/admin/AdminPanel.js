
import React from 'react';
import AdminAdvertisementsList from '../../components/admin/AdminAdvertisementsList';
class AdminPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {

        return (
            <div>
                <h1>Admin Panel</h1>
                <AdminAdvertisementsList/>
            </div>
        );
    }
}


export default AdminPanel;



