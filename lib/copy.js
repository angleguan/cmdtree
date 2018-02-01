const copyDir = require('../utils/copyDirectory'),
  path = require('path'),
  config = require('./config');

function copyStaticRes() {
  copyDir.copyDirSync(config.static_dir, config.public_dir);
}

copyStaticRes();

module.exports = copyStaticRes;
