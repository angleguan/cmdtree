const template = require('art-template'),
  fs = require('fs-extra'),
  path = require('path'),
  config = require('./config'),
  data = require('./data')

let html = template(path.join(config.template_dir+'/post.html'), data);

console.log(html);