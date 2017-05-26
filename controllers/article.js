const Article = require('../models').Article;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 新增、编辑保存文章
/**
 * {
 *      id: 1,
 *      title: '',
 *      tags: [''],
 *      content: ''
 * 
 * }
 * 
 * 
 */
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