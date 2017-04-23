var router = require('koa-router')();
var fs = require('fs');

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: '成功'
  };
});

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = {
    code: 200,
    msg: 'success'
  };
});

module.exports = router;
