var router = require('koa-router')();
var fs = require('fs');
var article = require('../controllers/article');
var tag = require('../controllers/tag');

router.get('/article/list', article.list);
router.post('/article/save', article.save);
router.post('/article/del', article.del);


router.post('/tag/create', tag.create);
router.get('/tag/list', tag.list);

module.exports = router;
