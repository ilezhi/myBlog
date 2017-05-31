import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_FAILURE,

    SAVE_ARTICLE_REQUEST,
    SAVE_ARTICLE_SUCCESS,
    SAVE_ARTICLE_FAILURE,

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


// 保存文章
export const saveArticle = article => {
    return {
        types: [SAVE_ARTICLE_REQUEST, SAVE_ARTICLE_SUCCESS, SAVE_ARTICLE_FAILURE],
        endpoint: '/api/article/save',
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
