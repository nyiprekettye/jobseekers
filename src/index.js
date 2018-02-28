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

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
    //setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

const Home = () => (
    <div>
        <h1>Home...</h1>
    </div>
)
const About = () => (
    <div>
        <h1>About...</h1>
    </div>
)
const Contact = ({ match }) => (
    <div>
        <h1>Contact...</h1>
    </div>
)

import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import App from "./components/App";

const MyApp = () => (
        <div>
            <App>
                <Greetings />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
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


