import {
    TAG_REQUEST,
    TAG_SUCCESS,
    TAG_FAILURE,

    ADD_TAG_REQUEST,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE
} from '../constants/tagType';


const tags = (state = {tags: []}, action) => {
    switch(action.type) {
        case TAG_REQUEST:
        case ADD_TAG_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case TAG_SUCCESS:
            return { ...state, isFetching: false, tags: action.data };
        case ADD_TAG_SUCCESS:
            let newState = { ...state, isFetching: false };
            newState.tags.push(...action.data);
            return newState;
        case TAG_FAILURE:
        case ADD_TAG_FAILURE:
            return { ...state, isFetching: false, error: action.message };
        default:
            return state;
    }
};

export default tags;

/**
 * tags: {
 *   isFetching: false,
 *   error: '',
 *   tags: [
 *      {
 *          id: '',
 *          name: '',
 *          count: ''
 *      }
 *  ]
 * 
 * 
 * 
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */