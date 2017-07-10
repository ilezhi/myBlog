var router = require('koa-router')();
var fs = require('fs');
var article = require('../controllers/article');
var tag = require('../controllers/tag');
var user = require('../controllers/user');
var auth = require('../controllers/auth');

router.post('/signin', user.signin);
router.post('/signout', user.signout);

router.get('/article/list', article.list);
router.post('/article/save',auth.userRequired, article.save);
router.post('/article/edit', auth.userRequired, article.edit);
router.post('/article/del', auth.userRequired, article.del);


router.get('/tag/list', tag.list);
router.post('/tag/create', auth.userRequired, tag.create);

module.exports = router;
