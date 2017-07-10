import { combineReducers } from 'redux';
import {
    COMMENTS_REQUEST,
    COMMENTS_SUCCESS,
    COMMENTS_FAILURE,

    SAVE_COMMENT_REQUEST,
    SAVE_COMMENT_SUCCESS,
    SAVE_COMMENT_FAILURE,
} from '../constants/commentType';

const isFetching = (state = false, action) => {
    switch(action.type) {
        case COMMENTS_REQUEST:
        case SAVE_COMMENT_REQUEST:
            return true;
        
        default:
            return false;
    }
};

const message = (state = {}, action) => {
    switch(action.type) {
        case COMMENTS_SUCCESS:
        case SAVE_COMMENT_SUCCESS:
            return {
                type: 'success', 
                text: action.data.msg 
            };
        
        case COMMENTS_FAILURE:
        case SAVE_COMMENT_FAILURE:
            return {
                type: 'error',
                text: action.message
            };
        
        default:
            return {...state};
    }
};

const list = (state = {}, action) => {
    switch(action.type) {
        case COMMENTS_SUCCESS:
            return {
                ...state,
                [action.data.data.articleId]: action.data.data.list
            };
        
        case SAVE_COMMENT_SUCCESS:
            let newState = {...state};
            newState[action.data.data.articleId].push(action.data.data.comment);
            return newState;
        
        default:
            return {...state};
    }
};

export default combineReducers({
    isFetching,
    message,
    list
});






/**
 * comment: {
 *      isFetching,
 *      message: {
 *          type,
 *          text
 *      },
 *      list: {
 *          articleId: []
 *      }
 * 
 * 
 * 
 * 
 * 
 * 
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
 * 
 */