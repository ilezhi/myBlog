const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../common/logger');
const pwd = require('../common/securepass');

mongoose.connect(config.db, {
    server: { poolSize: 20 }
}, function (err) {
    if (err) {
        logger.error('connect to %s error', config.db, err.message);
        process.exit(1);
    }


    // 初始化时注册默认用户
    var userModel = mongoose.model('User');
    userModel.findOne(async(err, user) => {
        if (!user) {
            var user = new userModel();
            user.loginname = config.loginname;
            try {
                user.pass = await pwd.encrypt(config.pass);
                user.save();
            } catch (err) {
                logger.error('encrypt pass error', err.message);
            }
        }
    });
});

// models
require('./user');
require('./article');
require('./reply');
require('./tag');


exports.User    = mongoose.model('User');
exports.Article = mongoose.model('Article');
exports.Reply   = mongoose.model('Reply');
exports.Tag     = mongoose.model('Tag');