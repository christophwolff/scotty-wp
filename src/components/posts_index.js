import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, setCurrentPage, setCurrentHeader, fetchBlogInfos } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import MediumSpinner from 'react-medium-spinner';
import Breadcrumbs from 'react-breadcrumbs';

class PostsIndex extends Component {

    componentWillMount() {
        const { page } = this.props.params;

        //Fetch the Blogposts (Dispatch Redux Action) for the current Page (Router Parameter)
        //we are on (Pagination)
        this.props.fetchPosts(page);

        //Fetch the Bloginfos (Dispatch Redux Action)
        this.props.fetchBlogInfos();

        //Set the current Page from react router to out redux state
        // If there is no state we are initially loaded the homepage and set the current Page to 1
        this.props.setCurrentPage(page || 1);

    }

    componentWillReceiveProps (nextProps) {
        //Are the Bloginfos allready in our props (Is the Promise ready)
        if(this.props.blogInfos.name != this.props.currentHeader.title){
            //Set the Header Infos from the Bloginfos (Dispatch Header Action)
            this.props.setCurrentHeader({
                title: nextProps.blogInfos.name,
                subtitle: nextProps.blogInfos.description,
                image: ''
            });
        }
        //Check if the currentPage is the actuall Page we are on
        if(this.props.currentPage == nextProps.currentPage) {
            this.props.setCurrentPage(this.props.params.page || 1);
        }

    }

    createMarkup(text) {
        return <div dangerouslySetInnerHTML={{__html: text}} />
    }


    handlePaginationClick(pageNum) {
        scrollTo(0,0);
        this.props.fetchPosts(pageNum);
    }

    renderPagination() {

        const { currentPage } = this.props;
        const { totalPages } = this.props;

        if (totalPages) {

            var pages = [];
            for (let i=1; i <= parseInt(totalPages); i++) {
                //Are we on the hompage or navigating with the pagination?
                if(currentPage == i || i == 1 && this.props.location.pathname == '/'){
                    pages.push(
                        <li key={i} className="active">
                            <Link
                                activeClassName="active"
                                onClick={() => this.handlePaginationClick(i)}
                                to={`/page/${i}`} >
                                {i}
                            </Link>
                        </li>);
                    } else {
                        pages.push(
                            <li key={i}>
                                <Link
                                    activeClassName="active"
                                    onClick={() => this.handlePaginationClick(i)}
                                    to={`/page/${i}`} >
                                    {i}
                                </Link>
                            </li>);
                    }
            }

            return pages;
        }
    }

    gotoPost(slug) {
        scrollTo(0,0);
        browserHistory.push(`/${slug}`);
    }

    renderPosts() {
        const { posts } = this.props;

        return posts.map((post) => {
            return (
              	<div key={post.id} className="post-wrapper">
                    <div className="post">
                      	<Link to={'/' + post.slug}>
                            <h2 className="post-title" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                        </Link>
                        <div className="post-subtitle" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
                 	</div>
                 	<hr className="small" ></hr>
             	</div>
              )
          })

    }
    render() {
        //Show Loading Indicator when ajax call is active and we have no props ()
        const { totalPages } = this.props;
        if(!totalPages) {
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
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div className="">
                            <Breadcrumbs
                              routes={this.props.routes}
                              params={this.props.currentHeader}
                              separator=" – "
                            />
                        </div>
                            {this.renderPosts()}
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    {this.renderPagination()}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    let { posts, totalPages, currentPage, currentHeader} = state.posts;
    let { blogInfos } = state.blogInfos;
    return {
        posts,
        totalPages,
        currentPage,
        currentHeader,
        blogInfos
    };
}

export default connect(mapStateToProps, { fetchPosts, setCurrentPage, setCurrentHeader, fetchBlogInfos })(PostsIndex);
