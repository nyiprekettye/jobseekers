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
import { setCurrentJobseeker } from './actions/jobseeker.action';

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
        token: jwtDecode(localStorage.jobseekerJwtToken),
        userName : localStorage.jobseekerName
    }));
}
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import JobseekersLoginPage from './components/login/JobseekersLoginPage';
import App from "./components/App";
import JobseekersSignUpPage from "./components/signup/JobseekersSignUpPage";
import JobseekersProfil from "./components/profil/JobseekersProfil";

const MyApp = () => (
        <div>
            <App>
                <Greetings />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/jobseekers-login" component={JobseekersLoginPage} />
                <Route path="/jobseekers-signup" component={JobseekersSignUpPage} />
                <Route path="/jobseeler-profil" component={JobseekersProfil} />
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


