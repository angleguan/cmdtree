const artTemplate = require('art-template'),
  fs = require('fs-extra'),
  path = require('path'),
  config = require('../config'),
  data = require('./data');

function template() {

  this.index = artTemplate(path.join(config.template_dir + '/index.html'), data());

  // pass 将文章内容作为参数传给data函数
  // 传文章对象
  this.post = item => artTemplate(path.join(config.template_dir + '/post.html'), data(item));

}

module.exports = template;