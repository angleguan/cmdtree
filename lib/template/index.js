const artTemplate = require('art-template'),
  fs = require('fs-extra'),
  path = require('path'),
  config = require('../config'),
  data = require('./data');

function template() {

  this.index = () =>  {

    let html = artTemplate(path.join(config.template_dir + '/index.html'), data());

    console.log('generate indexpage');

    return html
  };

  // 将文文章对象作为参数传给data函数
  this.post = item => artTemplate(path.join(config.template_dir + '/post.html'), data(item));

  this.page = item => artTemplate(path.join(config.template_dir + '/page.html'), data(item));

}

module.exports = template;
