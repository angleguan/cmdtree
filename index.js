const fs = require('fs-extra'),
  rd = require('rd'),
  path = require('path'),
  MarkdownIt = require('markdown-it'),
  moment = require('moment'),
  fm = require('./lib/front-matter'),
  Db = require('./lib/db'),
  config = require('./lib/config');

const md = new MarkdownIt();

let writeDb = new Db();

let postLink = (fileName) => {
  return path.join(config.post_permalink, fileName).replace("\\", "/") + ".html";
};

moment().format();

function getFiles() {

  // 读取所有的Markdown文件
  files = rd.readFileSync(config.source_dir);

  files.forEach((filePath, index) => {

    fileName = (path.basename(filePath).slice(0, -3));

    mdContent = fs.readFileSync(filePath, 'utf-8');

    let fContent = fm(mdContent);

    post = {
      title: fContent.attributes.title,
      date: f => moment(fContent.attributes.date).format(f || 'YYYY-MM-DD'),
      category: fContent.attributes.category,
      conetnt: md.render(fContent.body),
      path: postLink(fileName)
    };

    writeDb.appendDb(post);

    // outputFile(post.conetnt)

  });

  writeDb.sortDb();

}

getFiles();
