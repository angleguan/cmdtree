const express = require('express'),
  fs = require('fs-extra'),
  path = require('path'),
  config = require('../lib/config'),
  tel = require('../lib/template/template');

const aa= new tel()

const app = new express;

app.use(express.static(config.public_dir));

// app.get('/', function (req, res) {
//   res.send(aa.index);
// });

app.listen(8080, () => {
  console.log('serve is working');
});