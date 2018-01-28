const path = require('path'),
  outputFileSync = require('../output-file-sync'),
  config = require('../config'),
  postFile = require(config.postsDb),
  tel = require('../template');

const data = require('../template/data');

const template = new tel();

function generatePost() {

  postFile.posts.forEach(item => {

    // 生成post文件，item对象作为参数传给template函数
    outputFileSync(path.resolve(config.public_dir, item.path), template.post(item), 'utf8')
  });

}

module.exports = generatePost;