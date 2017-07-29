exports.userRequired = async(ctx, next) => {
    if (!ctx.session.user) {
        return ctx.body = {
            code: 2,
            msg: '您还没有登录。'
        };
    }

    await next();
};