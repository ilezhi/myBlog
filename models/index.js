const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../common/logger');

mongoose.connect(config.db, {
    server: { poolSize: 20 }
}, function (err) {
    if (err) {
        logger.error('connect to %s error', config.db, err.message);
        process.exit(1);
    }


    // 初始化时注册默认用户
    var userModel = mongoose.model('User');
    userModel.findOne(function(err, user) {
        if (!user) {
            var user = new userModel();
            user.loginname = config.loginname;
            user.pass = config.pass;
            user.save();
        }
    });
    
});

// models
require('./user');
require('./article');
require('./reply');
require('./tag');


exports.user    = mongoose.model('User');
exports.article = mongoose.model('Article');
exports.reply   = mongoose.model('Reply');
exports.tag     = mongoose.model('Tag');