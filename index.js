const fs = require('fs-extra'),
  rd = require('rd'),
  path = require('path'),
  MarkdownIt = require('markdown-it'),
  moment = require('moment'),
  fm = require('./lib/front-matter'),
  Db = require('./lib/db'),
  config = require('./lib/config');

const md = new MarkdownIt(),
  writeDb = new Db();

moment().format();

let postLink = fileName => path.join(config.post_permalink, fileName).replace("\\", "/") + ".html";

function getFiles() {

  // 读取所有的Markdown文件
  rd.readFileSync(config.source_dir).forEach( filePath => {

    let fileName = (path.basename(filePath).slice(0, -3));

    let mdContent = fs.readFileSync(filePath, 'utf-8');

    let fContent = fm(mdContent);

    const post = {
      title: fContent.attributes.title,
      date: f => moment(fContent.attributes.date).format(f || 'YYYY-MM-DD'),
      category: fContent.attributes.category,
      conetnt: md.render(fContent.body),
      path: postLink(fileName)
    };

    writeDb.appendDb(post);

  });

  writeDb.sortDb();

}

getFiles();

module.exports = getFiles;