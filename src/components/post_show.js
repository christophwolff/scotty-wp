import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, clearPost, setCurrentHeader } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import { POSTS_URL } from '../config/config.js';
import dateFormat from 'dateformat';
import MediumSpinner from 'react-medium-spinner';
import Breadcrumbs from 'react-breadcrumbs';

class PostShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {

        const { fetchPost } = this.props;
        const { slug } = this.props.params;

        axios.get(`${POSTS_URL}/?filter[name]=/${slug}`)
            .then((response) => {

            //Set the post State
            fetchPost(slug);

            //Set the Header Infos
            this.props.setCurrentHeader({
                title: response.data[0].title.rendered,
                subtitle: dateFormat(response.data[0].date, "fullDate"),
                image: response.data[0].featured_image_thumbnail_url
            })
        })
            .catch(function (error) {
                console.log(error);
        });
    }

    componentWillUnmount() {
        //Hack to prevent Flickering when the last post was in the Global state
        //We need to clear this to have a clean Post-Object.
        this.props.clearPost();

    }

    createMarkup(text) {
        return <div dangerouslySetInnerHTML={{__html: text}} />
    }
    render() {

        const { post } = this.props;

        if (!post) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <MediumSpinner active={true}/>
                        </div>
                    </div>
                </div>
        );
    }

    return (
        <article>
	        <div className="container">
	            <div className="row">
	                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div className="breadcrumb">
                        <Breadcrumbs
                          routes={this.props.routes}
                          params={this.props.params}
                          separator=" – "
                        />
                    </div>
	                    <div className="entry-content" dangerouslySetInnerHTML={{__html: post[0].content.rendered}} />
                        <a onClick={() => browserHistory.goBack()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 447.175 447.175">
                                <path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"/>
                            </svg>
                        </a>
                    </div>
	            </div>
	        </div>
	    </article>
    );
  }
}

function mapStateToProps(state) {
    let { post, currentPage, currentHeader } = state.post;
    return {
        post,
        currentPage,
        currentHeader
    };
}

export default connect(mapStateToProps, { fetchPost, clearPost, setCurrentHeader })(PostShow);
