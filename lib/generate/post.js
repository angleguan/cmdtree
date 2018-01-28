const path = require('path'),
  outputFileSync = require('../output-file-sync'),
  config = require('../config'),
  postFile = require(config.postsDb),
  tel = require('../template');

const template = new tel();

function generatePost() {

  postFile.posts.forEach(item => {

    outputFileSync(path.resolve(config.public_dir, item.path), template.post(item.content), 'utf8')

  });

};

module.exports = generatePost;