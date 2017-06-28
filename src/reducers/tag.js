import { combineReducers } from 'redux';
import {
    TAG_REQUEST,
    TAG_SUCCESS,
    TAG_FAILURE,

    ADD_TAG_REQUEST,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE
} from '../constants/tagType';

const isFetching = (state = false, action) => {
    switch(action.type) {
        case TAG_REQUEST:
        case ADD_TAG_REQUEST:
            return true;
        
        case TAG_SUCCESS:
        case ADD_TAG_SUCCESS:
        case TAG_FAILURE:
        case ADD_TAG_FAILURE:
            return false;
        
        default:
            return state;
    }
};

const message = (state = {}, action) => {
    switch(action.type) {
        case TAG_SUCCESS:
        case ADD_TAG_SUCCESS:
            return { type: 'success', text: action.data.msg };
        
        case TAG_FAILURE:
        case ADD_TAG_FAILURE:
            return { type: 'error', text: action.data.msg };
        
        default:
            return state;
    }
};

const list = (state = [], action) => {
    switch(action.type) {
        case TAG_SUCCESS:
            return [ ...action.data.data ];
        
        case ADD_TAG_SUCCESS:
            return [ ...state, action.data.data];
        
        default:
            return state;
    }
};

export default combineReducers({
    isFetching,
    message,
    list
});

/**
 * tags: {
 *   isFetching: false,
 *   message: {
 *      type: '',
 *      text: ''
 *   },
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