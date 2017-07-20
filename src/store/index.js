const config = require('../../config/webpack');
if (config.env === 'development') {
  module.exports = require('./configStore');
} else {
  module.exports = require('./appStore');
}