const Article = require('../models').Article;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 获取文章列表
exports.list = async function(ctx, next) {
    let count = 0;
    let articles = [];
    let { pageNum = 3, pageSize = 10 } = ctx.query;
    let start = pageSize * (page - 1);
    let queryCount = Article.count();
    let query = Article
                    .find()
                    .skip(start)
                    .limit(+pageSize)
                    .sort({update_at: -1})
                    .select('title content tags update_at');

    
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
            pageNum,
            pageSize,
            list,
            total
        }
    };
}

/**
 * @desc   新增文章
 * @param  {title, tags, content}
 * @return {code, msg, data: { id, title, tags, content, createdAt, updatedAt}}
 */
exports.save = async function(ctx, next) {
    var article = ctx.request.body;


    var newArticle = new Article(article);
    console.log('article', article);
    try {
        var a = await newArticle.save();
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: 'fail to create article'
        };
    }

    return ctx.body = {
        code: 0,
        msg: 'success',
        data: {
            id: a._id,
            ...article
        }
    };
};


/**
 * @desc   编辑文章
 * @param  { id, title, tags, content }
 * @return { id, title, tags, content, updatedAt, createdAt }
 */
exports.edit = async function(ctx, next) {
    let { id, ...left } = article;
    var a = await Article.update({_id: id});
    console.log('update', a);
}

// 删除文章
exports.del = async function(ctx, next) {
    var id = ctx.request.body.id;
    console.log(id);
    ctx.body = {
        code: 0,
        msg: 'success',
        data: id
    };
};
