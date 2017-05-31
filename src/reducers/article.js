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
    let {list = [], pagination = [] } = state;

    switch(action.type) {
        case ARTICLE_REQUEST:
        case ARTICLES_REQUEST:
        case SAVE_ARTICLE_REQUEST:
            return { ...state, isFetching: true, error: ''};

        case ARTICLES_SUCCESS:
            // 获取文章列表
            let { articles, page, pageSize, count } = action.data;

            // 文章列表中都是哪几页的文章
            pagination.push(page);
            pagination.sort((v1, v2) => v1 - v2);

            articles.forEach(article => {
                article.complete = 0;
                article.id = article._id;
                delete article._id;
            });
            
            // 新增文章, 需要从list中删除重复的文章
            let delCount = 0;               
            let maxPage = Math.ceil(count / pageSize);
            
            // 已经显示过最后一页数据
            if (page !== maxPage) {
                delCount = articles.length % pageSize;
            } else {
                delCount = count % pageSize;
            }

            let start = (page - 1) * pageSize;
            list.splice(start, delCount, ...articles);

            return { isFetching: false, page, pageSize, count, pagination, list };

        case ARTICLE_SUCCESS:
            // 获取文章详情
            let { _id, ...content } = action.data
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === _id) {
                    list[i].content = content;
                    list[i].complete = 1;
                    break;
                }
            }
            return {...state, isFetching: false, list};

        case SAVE_ARTICLE_SUCCESS:
            let { _id: aid, ...left } = action.data;
            let article = {
                ...left,
                id: aid,
                complete: 0
            };
            list.unshift(article);
            return { ...state, isFetching: false, list, count: state.count + 1};

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
 *  count: 20,
 *  pagination: [],
 *  list: [
 *      {
 *          id: '',
 *          title: '',
 *          tags: [],
 *          content: '',
 *          createAt: '',
 *          updateAt: '',
 *          complete: 0,
 *      },
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

