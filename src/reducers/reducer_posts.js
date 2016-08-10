import { FETCH_POSTS, CLEAR_POSTS, SET_CURRENT_PAGE, SET_CURRENT_HEADER, FETCH_BLOG_INFOS} from '../actions/index';

const INITIAL_STATE = { posts: [], post: null, currentPage: null, currentHeader: {} };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {...state,
                currentPage: action.payload
            };
        case SET_CURRENT_HEADER:
            return {...state,
                currentHeader: action.payload
            };
        case FETCH_POSTS:
            return {...state,
                posts: action.payload.data,
                totalPages: action.payload.headers['x-wp-totalpages']
            };
        case FETCH_BLOG_INFOS:
            return {...state,
                blogInfos: action.payload.data
            };
        case CLEAR_POSTS:
            //Clear Post for Flickering. (Hacky but it works)
            return {...state,
                posts: []
            };
        default:
            return state;
    }
}
