import { FETCH_BLOG_INFOS } from '../actions/index';

const INITIAL_STATE = { blogInfos: {} };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_BLOG_INFOS:
            return {...state,
                blogInfos: {
                    name: action.payload.data.name,
                    description: action.payload.data.description
                }
            };
        default:
            return state;
    }
}
