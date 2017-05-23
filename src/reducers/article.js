import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_FAILURE,

    ARTICLE_REQUEST,
    ARTICLE_SUCCESS,
    ARTICLE_FAILURE,
} from '../constants/articleType';


// 获取文章列表
const articles = (state = {}, action) => {
    switch(action.type) {
        case ARTICLES_REQUEST:
        case ARTICLE_REQUEST:
            return { ...state, isFetching: true, error: ''};
        case ARTICLES_SUCCESS:
            let cont = { ...state.content };
            let { articles, page, pageSize } = action.data;
            articles.forEach(item => {
                let { id, ...left } = item;
                if (id in newCont) {
                    return;
                }
                cont[id] = left;
            });

            return { isFetching: false, error: '', page, pageSize, content: cont };
        case ARTICLE_SUCCESS:
            let { id, data } = action;
            let content = { ...state.content };
            content[id] = data;
            return {...state, content};
        case ARTICLES_FAILURE:
        case ARTICLE_FAILURE:
            return { ...state, isFetching: false, error: action.message };
        default:
            return state;
    }
};

export default articles;

/**
 * article: {
 *  isFetching: false,
 *  page: 1,
 *  pageSize: 10,
 *  error: ''
 *  content: [
 *      {   
 *          id: '',
 *          title: '',
 *          tags: [],
 *          content: '',
 *          createdAt: '',
 *          updatedAt: ''
 *      }
 *  ]
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

