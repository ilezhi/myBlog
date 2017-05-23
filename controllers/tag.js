const Tag = require('../models').Tag;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.create = async (ctx, next) => {
    console.log('进入');
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
        console.log(newTag);
        return ctx.body = {
            code: 0,
            msg: 'success',
            data: [
                {
                    id: newTag._id,
                    name: newTag.tag,
                    count: 0,
                }
            ]
        };
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: 'fail to add tag'
        };
    }
};