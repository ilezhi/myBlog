const Tag = require('../models').Tag;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.create = async (ctx, next) => {
    const tagname = ctx.request.body.tag;

    if (tagname === '') {
        return ctx = {
            code: 1,
            msg: '添加的标签名不能为空'
        };
    }

    let code = -1;
    let msg = '';
    let tag = new Tag();
    tag.tag = tagname;

    try {
        await tag.save();
        code = 0;
        msg = 'success';
    } catch (err) {
        code = 1,
        msg = 'fail to add tag'
    }

    return ctx.body = {
        code,
        msg
    };
};