const Article = require('../models').Article;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 获取文章列表
exports.list = async function(ctx, next) {
    console.log('session', ctx.session);
    let { pageNum = 1, pageSize = 20 } = ctx.query;
    let start = pageSize * (pageNum - 1);
    let queryCount = Article.count();
    let query = Article
                    .find()
                    .skip(start)
                    .limit(+pageSize)
                    .sort({update_at: -1})
                    .select('title content tags update_at create_at reply_count visit_count');

    
    let total = 0;
    let list = null;
    try {
        let data = await Promise.all([queryCount.exec(), query.exec()]);
        total = data[0];
        list = data[1];

    } catch(err) {
        ctx.body = {
            code: 1,
            msg: 'fail to query data'
        };

        return;
    }

    ctx.body = {
        code: 0,
        msg: 'success',
        data: {
            pageNum: parseInt(pageNum, 10),
            pageSize: parseInt(pageSize, 10),
            list,
            total
        }
    };
}

/**
 * @desc   新增文章
 * @param  {title, tags, content}
 * @return {code, msg, data: { _id, title, tags, content, createdAt, updatedAt}}
 */
exports.save = async function(ctx, next) {
    let { title, tags, content } = ctx.request.body;

    let msg = '';

    if (title === '') {
        msg = '标题不能为空';
    } else if (title.length < 5 || title.length > 20) {
        msg = '标题字数不能超过20字';
    } else if (content === '') {
        msg = ''
    }

    if (msg) {
        return ctx.body = {
            code: 1,
            msg
        };
    }


    let model = new Article({title, tags, content});
    try {
        let article = await model.save();

        return ctx.body = {
            code: 0,
            msg: 'success',
            data: article
        };
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: 'fail to create article'
        };
    }
};


/**
 * @desc   编辑文章
 * @param  { id, title, tags, content }
 * @return { code, msg, data: {_id, title, tags, content, updatedAt, createdAt} }
 */
exports.edit = async function(ctx, next) {
    let { id, ...update } = ctx.request.body;
    let { title, content } = update;
    let msg = '';

    if (title === '') {
        msg = '标题不能为空';
    } else if (title.length < 5 || title.length > 20) {
        msg = '标题字数不能超过20字';
    } else if (content === '') {
        msg = ''
    }

    if (msg) {
        return ctx.body = {
            code: 1,
            msg
        };
    }

    try {
        let now = new Date();
        update.update_at = now;
        await Article.findByIdAndUpdate({_id: id}, update).exec();
        let query = Article.findById({_id: id});
        let a = await query.exec();
        return ctx.body = {
            code: 0,
            msg: 'success',
            data: a
        };

        
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: err.message
        };
    }
};

// 删除文章
exports.del = async function(ctx, next) {
    let id = ctx.request.body.id;
    
    if (!id) {
        return ctx.body = {
            code: 1,
            msg: 'id不能为空'
        };
    }

    try {
        await Article.findByIdAndRemove({_id: id}).exec();
        return ctx.body = {
            code: 0,
            msg: 'success',
            data: { id }
        };
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: err.message
        };
    }
  
};
