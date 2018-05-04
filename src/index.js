import React from 'react';
import  ReactDOM  from 'react-dom';
/*
import routes from './Routes';
 */
import {  BrowserRouter as Router ,Link, Route} from 'react-router-dom';

import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducers';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/auth.action';
import { setCurrentJobseeker } from './actions/jobseeker.auth.action';
import { setCurrentCompany } from './actions/company.auth.action';
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

if (localStorage.jobseekerJwtToken,localStorage.jobseekerName) {
    store.dispatch(setCurrentJobseeker({
        //token: jwtDecode(localStorage.jobseekerJwtToken),
        token: localStorage.jobseekerJwtToken,
        userName : localStorage.jobseekerName
    }));
}
if (localStorage.companyJwtToken,localStorage.companyName) {
    store.dispatch(setCurrentCompany({
        //token: jwtDecode(localStorage.jobseekerJwtToken),
        token: localStorage.companyJwtToken,
        userName : localStorage.companyName
    }));
}

import Greetings from './components/Greetings';
import JobseekersLoginPage from './components/login/JobseekersLoginPage';
import CompanyLoginPage from './components/login/CompanyLoginPage';
import App from "./components/App";
import JobseekersSignUpPage from "./components/signup/JobseekersSignUpPage";
import CompanySignUpPage from "./components/signup/CompanySignUpPage";
import JobseekersProfil from "./components/profil/JobseekersProfil";
import CompanyProfil from "./components/profil/CompanyProfil";
import JobseekerAddNewCVPage from "./components/jobseeker/JobseekerAddNewCVPage";

import AdminLoginPage from "./components/login/AdminLoginPage";
import CompanyAddNewJobAdvertisment from "./components/company/CompanyAddNewJobAdvertisement";
import CompanyUpdateJobAdvertisementById from "./components/company/CompanyUpdateJobAdvertisementById";
import AdminPanel from "./components/admin/AdminPanel";
import AdminAdvertisementInspectPage from "./components/admin/AdminAdvertisementInspectPage";
import SearchResultPage from "./components/SearchResultPage";
import AdvertisementPage from "./components/AdvertisementPage";
import CompanyAdvertisementPage from "./components/company/CompanyAdvertisementPage";
import CompanyJobseekerProfil from "./components/company/CompanyJobseekerProfil";
import CompanyPage from "./components/CompanyPage";

const MyApp = () => (
    <div>
        <App>
            <Greetings />
            <Route path="/search/:searchText" component={SearchResultPage} />
            <Route path="/advertisement/:advertisement_id" component={AdvertisementPage} />
            <Route path="/company/:company_id" component={CompanyPage} />


            <Route path="/jobseekers-login" component={JobseekersLoginPage} />
            <Route path="/jobseekers-signup" component={JobseekersSignUpPage} />
            <Route path="/jobseeler-profil" component={JobseekersProfil} />
            <Route path="/jobseeker-add-new-cv" component={JobseekerAddNewCVPage} />

            <Route path="/company-login" component={CompanyLoginPage} />
            <Route path="/company-signup" component={CompanySignUpPage} />
            <Route path="/company-profil" component={CompanyProfil} />
            <Route path="/company-add-new-advertisment" component={CompanyAddNewJobAdvertisment} />
            <Route path="/company-update-advertisment-by-id/:id" component={CompanyUpdateJobAdvertisementById} />
            <Route path="/company-advertisement/:advertisement_id" component={CompanyAdvertisementPage} />
            <Route path="/company-get-jobseeker/:jobseekerId" component={CompanyJobseekerProfil} />

            <Route path="/admin-login" component={AdminLoginPage} />
            <Route path="/admin-panel" component={AdminPanel} />
            <Route path="/admin-inspect-advertisment-by-id/:id" component={AdminAdvertisementInspectPage} />


        </App>
    </div>
)
  

const container = document.getElementById('container');
ReactDOM.render(
    <Provider store={store}>
        <Router >
            <MyApp/>
        </Router>
    </Provider>, container);


