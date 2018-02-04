const fs = require('fs-extra'),
  rd = require('rd'),
  path = require('path'),
  MarkdownIt = require('markdown-it'),
  hljs = require('highlight.js'),
  moment = require('moment'),
  fm = require('./lib/front-matter'),
  Db = require('./lib/db'),
  config = require('./lib/config');

const writeDb = new Db();

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs ' + lang + '">' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

moment().format();

const postLink = fileName => path.join(config.post_permalink, fileName).replace("\\", "/") + ".html";

const formatFileName = filePath => path.basename(filePath).slice(0, -3).replace(/ /g, '-').toLocaleLowerCase();

function getPosts() {

  // 读取所有的Markdown文章
  rd.readFileSync(config.source_post_dir).forEach(filePath => {

    let fileName = formatFileName(filePath);

    let mdContent = fs.readFileSync(filePath, 'utf-8');

    let fContent = fm(mdContent);

    const post = {
      title: fContent.attributes.title,
      date: f => moment(fContent.attributes.date).format(f || 'YYYY-MM-DD'),
      category: fContent.attributes.category,
      conetnt: md.render(fContent.body),
      path: postLink(fileName)
    };

    writeDb.appendPostsDb(post);

  });

  writeDb.sortDb();

}

function getPages() {

  // 读取所有的Markdown页面
  rd.readFileSync(config.source_page_dir).forEach(filePath => {

    let fileName = formatFileName(filePath);

    let mdContent = fs.readFileSync(filePath, 'utf-8');

    let fContent = fm(mdContent);

    const page = {
      title: fContent.attributes.title,
      path: (fContent.attributes.path || fileName) + '.html', // fContent.attributes.path? fContent.attributes.path: fileNam
      content: md.render(fContent.body)
    };

    writeDb.appendPagesDb(page);

  })
}

getPages();
getPosts();

module.exports = () => {
  getPages();
  getPosts();
}
