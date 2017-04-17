const config = require('./config/webpack');
console.log(config.env);
module.exports = require(`./build/webpack.${config.env}`);