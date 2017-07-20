import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,

    SIGNOUT_SUCCESS,
    SIGNOUT_FAILURE,

    ADD_USER_FROM_LOCAL,

    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,

    RESET_PASSWD_REQUEST,
    RESET_PASSWD_SUCCESS,
    RESET_PASSWD_FAILURE,
} from '../constants/userType';

import fetch from '../assets/js/fetch';

export const signin = (params) => {
    return {
        types: [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE],
        shouldCallApi: true,
        endpoint: '/api/signin',
        params: {
            type: 'POST',
            data: {...params}
        }
    };
};

export const addUserInfo = (params) => {
    return {
        type: ADD_USER_FROM_LOCAL,
        data: {...params}
    }
};

export const signout = () => {
    return async dispatch => {
        try {
            let resp = await fetch('/api/signout', 'POST');
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }

            let res = await resp.json();

            if (res.code) {
                throw new Error(res.msg);
            }

            return dispatch({
                type: SIGNOUT_SUCCESS
            });
        } catch (err) {
            return dispatch({
                type: SIGNOUT_FAILURE,
                message: err.message
            });
        }
    }
};


export const editUser = (params) => {
    return {
        types: [EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE],
        shouldCallApi: true,
        endpoint: '/api/user/edit',
        params: {
            type: 'POST',
            data: {...params}
        }
    };
};

export const resetPasswd = params => {
    return {
        types: [RESET_PASSWD_REQUEST, RESET_PASSWD_SUCCESS, RESET_PASSWD_FAILURE],
        shouldCallApi: true,
        endpoint: '/api/user/reset/passwd',
        params: {
            type: 'POST',
            data: {...params} 
        }
    }
};

