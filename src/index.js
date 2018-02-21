import React from 'react';
import { render } from 'react-dom';
import routes from './Routes';
import { Router, browserHistory } from 'react-router';
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

const container = document.getElementById('container');
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, container);


