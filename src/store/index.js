const config = require('../../config/webpack');
if (config.env === 'development') {
  console.log('**********************');
  module.exports = require('./configStore');
} else {
  module.exports = require('./appStore');
}