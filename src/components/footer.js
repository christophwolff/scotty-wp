import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
    	let currentYear = new Date().getFullYear()
        return (
        	<footer>
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
		                    <p className="copyright text-muted">&copy; Scotty - A REACT WordPress Theme {currentYear}</p>
		                </div>
		            </div>
		        </div>
		    </footer>
        )
    }
}
