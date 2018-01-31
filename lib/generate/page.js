const path = require('path'),
  outputFileSync = require('../output-file-sync'),
  config = require('../config'),
  pageFile = require(config.pagesDb),
  tel = require('../template');

const data = require('../template/data');

const template = new tel();

function generatePage() {

  pageFile.pages.forEach(item => {

    // 生成page文件，item对象作为参数传给template函数
    outputFileSync(path.resolve(config.public_dir, item.path), template.page(item), 'utf8')
  });

}

module.exports = generatePage;
