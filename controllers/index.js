exports.home = async (ctx, next) => {
    await ctx.render('index');
};