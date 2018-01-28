const path = require('path'),
  outputFileSync = require('./output-file-sync'),
  config = require('./config'),
  postFile = require(config.postsDb);

module.exports = function generatePost(data) {

  postFile.posts.forEach(item => {

    outputFileSync(path.resolve(config.public_dir, item.path) + '.html', item.content, 'utf8')

  });

};
