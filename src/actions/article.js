import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_FAILURE,

    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILURE,

    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_FAILURE,

    DEL_ARTICLE_REQUEST,
    DEL_ARTICLE_SUCCESS,
    DEL_ARTICLE_FAILURE,
} from '../constants/articleType';

// 获取文章列表
export const fetchArticles = (params) => {
    return {
        types: [ARTICLES_REQUEST, ARTICLES_SUCCESS, ARTICLES_FAILURE],
        shouldCallApi: true,
        endpoint: '/api/article/list',
        params: {
            type: 'GET',
            data: params
        }
    };
};


// 新增文章
export const saveArticle = article => {
    return {
        types: [CREATE_ARTICLE_REQUEST, CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAILURE],
        endpoint: '/api/article/save',
        params: {
            type: 'POST',
            data: article
        }
    };
};

// 编辑文章
export const editArticle = article => {
    return {
        types: [EDIT_ARTICLE_REQUEST, EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_FAILURE],
        endpoint: '/api/article/edit',
        params: {
            type: 'POST',
            data: article
        }
    };
};

// 删除文章
export const delArticleById = id => {
    return {
        types: [DEL_ARTICLE_REQUEST, DEL_ARTICLE_SUCCESS, DEL_ARTICLE_FAILURE],
        endpoint: '/api/article/del',
        params: {
            type: 'POST',
            data: { id }
        }
    };
};
