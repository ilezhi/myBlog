import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_FAILURE,

    ARTICLE_REQUEST,
    ARTICLE_SUCCESS,
    ARTICLE_FAILURE,

    SAVE_ARTICLE_REQUEST,
    SAVE_ARTICLE_SUCCESS,
    SAVE_ARTICLE_FAILURE,
} from '../constants/articleType';


// 获取文章列表
const articles = (state = {}, action) => {
    let list = { ...state.list };

    switch(action.type) {
        case ARTICLE_REQUEST:
        case ARTICLES_REQUEST:
        case SAVE_ARTICLE_REQUEST:
            return { ...state, isFetching: true, error: ''};

        case ARTICLES_SUCCESS:
            // 获取文章列表
            let { articles, page, pageSize } = action.data;
            articles.forEach(article => {
                let { id, ...left } = article;
                list[id] = left;
                list[id].complete = 0;
            });

            return { isFetching: false, error: '', page, pageSize, list };

        case ARTICLE_SUCCESS:
            // 获取文章详情
            console.log('获取文件详情', action);
            let { id, ...content } = action.data
            list[id].content = content;
            list[id].complete = 1;
            return {...state, isFetching: false, list};

        case SAVE_ARTICLE_SUCCESS:
            let { id: aid, ...left } = action.data;
            list[aid] = left;
            list[aid].complete = 1;
            return { ...state, isFetching: false, list};

        case ARTICLE_FAILURE:
        case ARTICLES_FAILURE:
        case SAVE_ARTICLE_FAILURE:
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
 *  error: '',
 *  list: {
 *      id: {
 *          title: '',
 *          tags: [],
 *          content: '',
 *          createAt: '',
 *          updateAt: '',
 *          complete: 0,
 *      },
 *  }
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

