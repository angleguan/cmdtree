const express = require('express'),
  fs = require('fs-extra'),
  path = require('path'),
  chokidar = require('chokidar'),
  config = require('../lib/config'),
  tel = require('../lib/template'),
  generate = require('../lib/generate');

const aa= new tel()

const app = new express;

app.use(express.static(config.public_dir));

app.listen(8080, () => {
  console.log('serve is working');
});