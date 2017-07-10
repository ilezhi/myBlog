import { combineReducers } from 'redux';
import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,

    ADD_USER_FROM_LOCAL,

    SIGNOUT_SUCCESS,
    SIGNOUT_FAILURE,
} from '../constants/userType';



const isFetching = (state = false, action) => {
    switch(action.type) {
        case SIGNIN_REQUEST:
            return true;
        
        default:
            return false;
    }
};


const message = (state = {}, action) => {
    switch(action.type) {
        case SIGNIN_SUCCESS:
            return {
                type: 'success',
                message: action.data.msg
            };
        
        case SIGNIN_FAILURE:
        case SIGNOUT_FAILURE:
            return {
                type: 'error',
                message: action.message
            };
        
        default:
            return state;
    }
};

const info = (state = {}, action) => {
    switch(action.type) {
        case SIGNIN_SUCCESS:
            return {
                ...state,
                ...action.data.data
            };

        case SIGNOUT_SUCCESS:
            return {};

        case ADD_USER_FROM_LOCAL:
            return {
                ...state,
                ...action.data
            };

        default:
            return state;
    }
};

export default combineReducers({
    isFetching,
    message,
    info
});