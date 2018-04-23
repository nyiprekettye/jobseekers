import React from 'react';

class JobseekerAddNewCVPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h1>Add new CV page</h1>
                    itt legyen a form amiben elküdöd az új cv adatokat a szervernek
                    hívd meg a jobbseeker.cv.action fáljból a jobseekerAddNewCV fgv
                    küldd el neki a megfelelő adatokat
                    ha megfelelő 200 statusszal tér vissza a fgv akkor irány a /jobseeler-profil
                    ha nem akkor a login/ reg ben látható módon
                    jelenjen meg felül a megfelelő hibaüzenet a szervertől
                </div>
            </div>
        );
    }
}
export default JobseekerAddNewCVPage;