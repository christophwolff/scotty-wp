import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
    render() {
        return (
		    <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
		        <div className="container-fluid">
		            <div className="navbar-header page-scroll">
		                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
		                <Link className="navbar-brand" to={'/'}>Scotty WP</Link>
		            </div>
		            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		                <ul className="nav navbar-nav navbar-right">
		                    <li>
		                        <Link to={'/'}>Home</Link>
		                    </li>
		                    <li>
		                    	<Link to={'/impressum'}>Impressum</Link>
		                    </li>
		                </ul>
		            </div>
		        </div>
		    </nav>
        )
    }
}
