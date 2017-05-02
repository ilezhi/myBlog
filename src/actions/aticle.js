import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_FAILURE,
} from '../constants/articleType';

// 获取文章列表
export const fetchArticles = (params) => {
    return {
        types: [ARTICLES_REQUEST, ARTICLE_SUCCESS, ARTICLE_FAILURE],
        shouldCallApi: true,
        endpoint: '',
        params,
    };
}