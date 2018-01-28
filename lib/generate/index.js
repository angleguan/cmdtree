const fs = require('fs-extra'),
  outputFileSync = require('../output-file-sync'),
  path = require('path'),
  config  = require('../config'),
  tel = require('../template'),
  template = new tel();

outputFileSync(path.resolve(config.public_dir, 'index.html'), template.index, 'utf8');
