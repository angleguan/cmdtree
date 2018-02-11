const fs = require('fs-extra'),
  outputFileSync = require('../output-file-sync'),
  path = require('path'),
  config  = require('../config'),
  tel = require('../template'),
  generatePost = require('./post'),
  generatePage = require('./page'),
  generateCategory = require('./category'),
  template = new tel();

function generate() {
  console.log('Generating');
  outputFileSync(path.resolve(config.public_dir, 'index.html'), template.home(), 'utf8');
  generatePost();
  generatePage();
  generateCategory();
  outputFileSync(path.resolve(config.public_dir, 'sitemap.xml'), template.sitemap(), 'utf8');
}

module.exports = generate;
