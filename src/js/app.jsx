import React from 'react';
import '../styles/app.css';
import { Router, Route, browserHistory } from 'react-router';
import Home from "./Home"

export default function app() {
    return (
        <div>
            <h1>JSX</h1>
            <span>My first JSX span!</span>
            <h2>hali</h2>
            <Home/>
            <Router history={browserHistory}>
                <Route path='/' component={Home} />
            </Router>
        </div>
    );
}

