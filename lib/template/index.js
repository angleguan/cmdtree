const artTemplate = require('art-template'),
  fs = require('fs-extra'),
  path = require('path'),
  config = require('../config'),
  data = require('./data');

function template() {

  this.index = artTemplate(path.join(config.template_dir + '/index.html'), data());

  this.post = content => artTemplate(path.join(config.template_dir + '/post.html'), data(content));

}

template();

module.exports = template;