import { combineReducers } from 'redux';
import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_FAILURE,

    ARTICLE_REQUEST,
    ARTICLE_SUCCESS,
    ARTICLE_FAILURE,

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


// 标识请求状态
const isFetching = (state = false, action) => {
    switch(action.type) {
        case ARTICLE_REQUEST:
        case ARTICLES_REQUEST:
        case EDIT_ARTICLE_REQUEST:
        case CREATE_ARTICLE_REQUEST:
        case DEL_ARTICLE_REQUEST:
            return true;
        
        default:
            return false;
    }
}

// 返回状态信息
const message = (state = {}, action) => {
    switch(action.type) {
        case ARTICLE_SUCCESS:
        case ARTICLES_SUCCESS:
        case EDIT_ARTICLE_SUCCESS:
        case CREATE_ARTICLE_SUCCESS:
        case DEL_ARTICLE_SUCCESS:
            return {
                type: 'success',
                text: action.data.msg
            };

        case ARTICLE_FAILURE:
        case ARTICLES_FAILURE:
        case EDIT_ARTICLE_FAILURE:
        case CREATE_ARTICLE_FAILURE:
        case DEL_ARTICLE_FAILURE:
            return {
                type: 'error',
                text: action.message
            };

        default:
            return state;
    }
};

const pagination = (state = { num: 1, size: 20, total: 0}, action) => {

    switch(action.type) {
        case ARTICLES_SUCCESS:
            let { pageNum: num, pageSize: size, total } = action.data.data;
            return { num, size, total };
        case CREATE_ARTICLE_SUCCESS:
            // 保存文章成功
            return { ...state, total: ++state.total };

        case DEL_ARTICLE_SUCCESS:
            return { ...state, total: --state.total };

        default:
            return state;
    }
};

const list = (state = [], action) => {
    switch(action.type) {
        case ARTICLE_SUCCESS:
            // 查询单个文章成功
            let list = [...state];
            let noExist = true;
            for (let i = 0; i < list.length; i++) {
                if (list[i]._id === action.data.data._id) {
                    list[i].content = action.data.data.content;
                    list[i].complete = 1;
                    noExist = false;
                    break;
                }
            }

            // 文章不在列表内,则直接添加到列表内
            if (noExist) {
                let { _id, title, tags, content, reply_count, visit_count, create_at, update_at } = action.data.data;
                list.push({
                    _id,
                    title,
                    tags,
                    content,
                    reply_count,
                    visit_count,
                    update_at,
                    create_at,
                });
            }

            return list;

        case ARTICLES_SUCCESS:
            // 查询文章列表
            return [...state, ...action.data.data.list];

        case  CREATE_ARTICLE_SUCCESS:
            // 新增文章
            let addList = [...state];
            let { _id, title, tags, content, reply_count, visit_count, create_at, update_at } = action.data.data
            addList.unshift({
                _id,
                title,
                tags,
                content,
                reply_count,
                visit_count,
                create_at,
                update_at
            });

            return addList;

        case EDIT_ARTICLE_SUCCESS:
            // 编辑文章
            let editList = [...state];
            for (let j = 0; j < editList.length; j++) {
                if (editList[j]._id === action.data.data._id) {
                    let { __v, ...left } = action.data.data;
                    editList[j] = left;
                    break;
                }
            }

            return editList;

        case DEL_ARTICLE_SUCCESS:
            // 删除文章
            let delList = [...state];
            for (let k = 0; k < delList.length; k++) {
                if (delList[k]._id === action.data.data.id) {
                    delList.splice(k, 1);
                    break;
                }
            }

            return delList;
            
        default:
            return state;
    }
}

export default combineReducers({
    isFetching,
    message,
    pagination,
    list
});



/**
 * 文章列表state
 * {
 *      isFetching,
 *      message: {
 *          type: success|error
 *          text: '添加成功'
 *      },
 *      pagination: {
 *          num: 1,
 *          size: 20,
 *          total: 20
 *      }
 *      list: []
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
 */