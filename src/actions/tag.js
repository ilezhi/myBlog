import {
    TAG_REQUEST,
    TAG_SUCCESS,
    TAG_FAILURE,

    ADD_TAG_REQUEST,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE,
} from '../constants/tagType';


export const addTag = tag => {
    return {
        types: [ADD_TAG_REQUEST, ADD_TAG_SUCCESS, ADD_TAG_FAILURE],
        shouldCallApi: () => true,
        endpoint: '/api/tag/create',
        params: {
            type: 'POST',
            data: { tag }
        }
    };
};

export const fetchTags = () => {
    return {
        types: [TAG_REQUEST, TAG_SUCCESS, TAG_FAILURE],
        shouldCallApi: () => true,
        endpoint: '/api/tag/list',
        params: {
            type: 'GET'
        }
    };
};