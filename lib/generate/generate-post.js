const path = require('path'),
  outputFileSync = require('../output-file-sync'),
  config = require('../config'),
  postFile = require(config.postsDb),
  templat = require('../template/template');

const template = new templat();

function generatePost() {

  postFile.posts.forEach(item => {

    outputFileSync(path.resolve(config.public_dir, item.path), template.post(item.content), 'utf8')

  });

};

module.exports = generatePost;