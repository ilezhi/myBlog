const Tag = require('../models').Tag;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * 获取所有标签
 */
exports.list = async (ctx, next) => {
    let query = Tag
                    .find()
                    .select('tag');
    
    let tags = null;
    try {
        let tags = await query.exec();
        return ctx.body = {
            code: 0,
            msg: 'success',
            data: tags
        };
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: 'fail to query tags'
        };
    }
};

exports.create = async (ctx, next) => {
    const tagname = ctx.request.body.tag;

    if (tagname === '') {
        return ctx.body = {
            code: 1,
            msg: '添加的标签名不能为空'
        };
    }

    let tag = new Tag();
    tag.tag = tagname;

    try {
        let newTag = await tag.save();
        return ctx.body = {
            code: 0,
            msg: 'success',
            data: {
                _id: newTag._id,
                tag: newTag.tag
            }
        };
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: 'fail to add tag'
        };
    }
};