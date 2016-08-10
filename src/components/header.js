import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentHeader, fetchBlogInfos } from '../actions/index';
import Breadcrumbs from 'react-breadcrumbs';


class Header extends Component {

    render() {

        let styles = {
            backgroundImage: {
                display: 'block',
                width: '100vw',
                height: '75vh',
                position: 'absolute',
                objectFit: 'cover'
            },
            background: {
                backgroundColor: '#0677bd'
            }

        }

        return (
            //Check if there is a Posthumbnail
            //@Todo Load a specific image size
		    <header className="intro-header" style={styles.background}>
                {
                    this.props.currentHeader.image ?
                        <img
                            src={this.props.currentHeader.image}
                            style={styles.backgroundImage} />

                        : ''
                }
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
		                    <div className="site-heading">
                                <h1 dangerouslySetInnerHTML={{__html: this.props.currentHeader.title}} />
    	                        <hr className="small" />
    	                        <span className="subheading">{this.props.currentHeader.subtitle}</span>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentHeader: state.posts.currentHeader,
        blogInfos: state.posts.blogInfos
    };
}

export default connect(mapStateToProps, { setCurrentHeader, fetchBlogInfos })(Header);
