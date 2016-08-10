import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsShow from './components/post_show';

export default (
    <Route name="Home" path="/" component={App}>
        <IndexRoute name="Post Index" component={PostsIndex} />
        <Route name="Archiv" path="page/:page" component={PostsIndex} />
        <Route name="Article" path=":slug" component={PostsShow} /> 
    </Route>
);
