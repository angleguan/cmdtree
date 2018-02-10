const path = require('path'),
  outputFileSync = require('../output-file-sync'),
  config = require('../config'),
  postFile = require(config.postsDb),
  tel = require('../template');

const data = require('../template/data');

const template = new tel();

function generateCategory() {

  for (let item in config.categories) {

    outputFileSync(path.resolve(config.public_dir, config.post_permalink, config.categories[item] + '.html'), template.category(item), 'utf8');

  }

}

module.exports = generateCategory;
