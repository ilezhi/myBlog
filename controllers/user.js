const User = require('../models').User;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.signin = async (ctx, next) => {
    let { loginname, pass } = ctx.request.body;

    if (!loginname || !pass) {
        return ctx.body = {
            code: 1,
            msg: '用户名或密码不能为空'
        };
    }

    try {
        let user = await User.findOne({loginname, pass}).exec();
        if (!user) {
            return ctx.body = {
                code: 1,
                msg: '用户名或密码错误'
            };
        }

        ctx.session.user = user;
        return ctx.body = {
            code: 0,
            msg: '登录成功',
            data: {
                _id: user._id,
                name: user.loginname
            }
        };
    } catch (err) {
        return ctx.body = {
            code: 1,
            msg: err.message
        };
    }
};

exports.signout = async(ctx, next) => {
    ctx.session = null;
    return ctx.body = {
        code: 1,
        msg: '退出成功'
    };
};