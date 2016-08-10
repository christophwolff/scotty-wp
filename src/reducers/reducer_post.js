import { FETCH_POST, CLEAR_POST } from '../actions/index';

const INITIAL_STATE = { post: null, fetchingPost: false };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POST:
            return {...state,
                post: action.payload.data
            };
        case CLEAR_POST:
            //Clear Post for Flickering. (Hacky but it works)
            return {...state,
                post: null
            };
        default:
            return state;
    }
}
