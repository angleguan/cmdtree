const artTemplate = require('art-template'),
  fs = require('fs-extra'),
  path = require('path'),
  config = require('../config'),
  data = require('./data');

function template() {

  this.home = () => artTemplate(path.join(config.template_dir + '/index.html'), data());

  this.post = post => artTemplate(path.join(config.template_dir + '/post.html'), data(post));

  this.page = page => artTemplate(path.join(config.template_dir + '/page.html'), data(page));

  this.category = category => artTemplate(path.join(config.template_dir + '/category.html'), data(category));

  this.sitemap = () => artTemplate(path.join(config.template_dir + '/sitemap.xml'), data());
}

module.exports = template;
