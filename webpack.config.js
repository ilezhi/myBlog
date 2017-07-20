const config = require('./config/webpack');
module.exports = require(`./build/webpack.${config.env}`);