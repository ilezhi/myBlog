const path = require('path');


const config = {
    name: 'weels',
    description: '一个程序员的成长，从小白到大白。',
    keywords: 'nodejs, node, react, spa, blog, code, koa',

    // 后台默认用户名和密码
    loginname: 'weels',
    pass: 'weels',

    db: 'mongodb://127.0.0.1/blog',

    port: 3000,
    
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },

    file_limit: '1MB',

    create_reply_per_day: 100,
    visit_per_day: 100,
};


module.exports = config;