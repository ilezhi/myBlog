const Article = require('../models').Article;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 获取文章列表
exports.list = async function(ctx, next) {
    let count = 0;
    let articles = [];
    let { page = 3, pageSize = 10 } = ctx.query;
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
        count = data[0];
        articles = data[1];
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
            page,
            pageSize,
            articles,
            count
        }
    };
}

// 新增、编辑保存文章
exports.save = async function(ctx, next) {
    var article = ctx.request.body;
    // 编辑
    if ('id' in article) {
        edit(article);
        return;
    }


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


const edit = async function(article) {
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
