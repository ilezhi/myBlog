const Article = require('../models').Article;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 新增文章
exports.create = async function(ctx, next) {
    var data = ctx.request.body;
    var newArticle = new Article(data);

    try {
        var a = await newArticle.save();
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: '文章保存失败'
        };
    }

    return ctx.body = {
        code: 0,
        msg: 'success'
    };
};