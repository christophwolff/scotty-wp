import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import PostReducer from './reducer_post';
import BlogInfosReducer from './reducer_bloginfos';

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    posts: PostsReducer,
    post: PostReducer,
    blogInfos: BlogInfosReducer,
    routing: routerReducer
});

export default rootReducer;
