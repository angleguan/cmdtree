const fs = require('fs-extra'),
  rd = require('rd'),
  path = require('path'),
  MarkdownIt = require('markdown-it'),
  moment = require('moment'),
  fm = require('./lib/front-matter'),
  writeDb = require('./lib/db'),
  config = require('./config');

const md = new MarkdownIt();

const site_url = config.site.url;
const public_dir = path.join(__dirname, config.generator.public_dir);
const source_dir = path.join(__dirname, config.generator.source_dir);
const postpermalink = config.generator.posts_permalink;

let postLink = (fileName) => {
  return path.join(postpermalink,fileName).replace("\\","/")+".html";
};

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
    files.forEach((filePath, index) => {

      fileName = (path.basename(filePath).slice(0, -3));

      mdContent = fs.readFileSync(filePath, 'utf-8');

      let fContent = fm(mdContent);

      post = {
        id: index,
        title: fContent.attributes.title,
        date: f => moment(fContent.attributes.date).format(f || 'YYYY-MM-DD'),
        category: fContent.attributes.category,
        conetnt: md.render(fContent.body),
        path: postLink(fileName)
      };

      writeDb(post);

      outputFile(post.conetnt)

    })
  })
}

function outputFile(data) {

  // 写入文件
  fs.writeFileSync(path.join(public_dir, fileName) + '.html', data, 'utf8')

}

getFiles();
