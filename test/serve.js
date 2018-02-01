const express = require('express'),
  config = require('../lib/config');

const app = new express;

app.use(express.static(config.public_dir));

app.listen(8080, () => {
  console.log('serve is working');
});