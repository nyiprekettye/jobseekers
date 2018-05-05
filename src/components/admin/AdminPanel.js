
import React from 'react';
import AdminAdvertisementsList from '../../components/admin/AdminAdvertisementsList';
import AdminAdvertisementPaymentPage from '../../components/admin/AdminAdvertisementPaymentPage';
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
                <AdminAdvertisementPaymentPage/>
            </div>
        );
    }
}


export default AdminPanel;



