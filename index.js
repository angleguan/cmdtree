const fs = require('fs-extra'),
  rd = require('rd'),
  path = require('path'),
  MarkdownIt = require('markdown-it'),
  moment = require('moment'),
  fm = require('./lib/front-matter'),
  writeDb = require('./lib/db'),
  config = require('./config');

const md = new MarkdownIt();

const public_dir = path.join(__dirname, config.generator.public_dir);
const source_dir = path.join(__dirname, config.generator.source_dir);


moment().format();

//创建生成文件夹
if (!fs.existsSync(public_dir)) {
  fs.mkdir(public_dir)
}

function getFiles() {

  // 读取所有的Markdown文件
  rd.readFile(source_dir, (err, files) => {
    if (err) {
      console.log(err)
    }

    //遍历所有的md文件
    files.forEach((filePath, index, files) => {

      fileName = (path.basename(filePath).slice(0, -3));

      mdContent = fs.readFileSync(filePath, 'utf-8');

      outputFile(fileName, mdContent, index)

    })
  })
}

function outputFile(fileName, data, index) {

  //front matter
  let content = fm(data);

  // noinspection JSAnnotator
  post = {
    id: index,
    title: content.attributes.title,
    date: f => moment(content.attributes.date).format(f),
    category: content.attributes.category,
    conetnt: md.render(content.body),
    path: fileName
  };

  writeDb(post);

  // 写入文件
  fs.writeFileSync(path.join(public_dir, fileName) + '.html', post.conetnt, 'utf8')

}

getFiles();
