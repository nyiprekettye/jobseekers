// components/Home.js
import React, { Component } from 'react';

export default class Home extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.history.push('/about');
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <button onClick={this.handleClick}>
                    Navigate outside of component to About page
                </button>
            </div>
        );
    }
}