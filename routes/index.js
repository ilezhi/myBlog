var router = require('koa-router')();
var fs = require('fs');
var article = require('../controllers/article');
var tag = require('../controllers/tag');
var user = require('../controllers/user');
var auth = require('../controllers/auth');
var index = require('../controllers');



router.post('/api/signin', user.signin);
router.post('/api/signout', user.signout);
router.post('/api/user/reset/passwd', auth.userRequired, user.resetPasswd);

router.get('/api/article/list', article.list);
router.post('/api/article/save',auth.userRequired, article.save);
router.post('/api/article/edit', auth.userRequired, article.edit);
router.post('/api/article/del', auth.userRequired, article.del);


router.get('/api/tag/list', tag.list);
router.post('/api/tag/create', auth.userRequired, tag.create);

router.get('*', index.home);

module.exports = router;
