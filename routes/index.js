var router = require('koa-router')();
var fs = require('fs');

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

module.exports = router;
