var router = require('koa-router')();
var fs = require('fs');
var article = require('../controllers/article');
var tag = require('../controllers/tag');

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

router.get('/article/list', article.list);
router.post('/article/save', article.save);
router.post('/article/del', article.del);


router.post('/tag/create', tag.create);

module.exports = router;
