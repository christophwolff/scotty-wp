import React, { Component } from 'react';

import Navigation from './navigation.js';
import Header from './header.js';
import Footer from './footer.js';

export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.routes);
        return (
        <div>
            <Navigation />
            <Header />
            <div className="content-container">
                {this.props.children}
            </div>
            <Footer />
        </div>
        );
    }
}
