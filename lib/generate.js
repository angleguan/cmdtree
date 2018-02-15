const fs = require('fs-extra');
const path = require('path');
const rd = require('rd');
const MarkdownIt = require('markdown-it');
const artTemplate = require('art-template');
const hljs = require('highlight.js');
const moment = require('moment');
const fm = require('../utils/front-matter');
const writeDb = require('./db');
const config = require('./config');
const outputFileSync = require('../utils/output-file-sync');

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

const postLink = fileName => path.join(config.post_permalink, fileName).replace(/\\/g, "/") + ".html";

const formatFileName = filePath => path.basename(filePath).slice(0, -3).replace(/ /g, '-').toLocaleLowerCase();

module.exports = () => {

  rd.readFileSync(config.source_page_dir).forEach(filePath => {

    let fileName = formatFileName(filePath);

    let mdContent = fs.readFileSync(filePath, 'utf-8');

    let fContent = fm(mdContent);

    const page = {
      title: fContent.attributes.title || fileName,
      path: (fContent.attributes.path || fileName) + '.html',
      content: md.render(fContent.body),
      url: config.site_url + '/' + (fContent.attributes.path || fileName) + '.html'
    };

    writeDb.appendPagesDb(page);

  });

  rd.readFileSync(config.source_post_dir).forEach(filePath => {

    let fileName = formatFileName(filePath);

    let mdContent = fs.readFileSync(filePath, 'utf-8');

    let fContent = fm(mdContent);

    const post = {
      title: fContent.attributes.title || fileName,
      date: moment(fContent.attributes.date).format('YYYY-MM-DD'),
      category: fContent.attributes.category || '杂文',
      content: md.render(fContent.body)
    };

    let __POST_DATE = {
      YEAR: moment(fContent.attributes.date).format('YYYY'),
      MONTH: moment(fContent.attributes.date).format('MM'),
      DAY: moment(fContent.attributes.date).format('DD')
    };

    post.path = postLink(path.join(__POST_DATE.YEAR, __POST_DATE.MONTH, fileName));
    post.url = config.site_url + '/' + post.path;

    writeDb.appendPostsDb(post);

  });

  writeDb.sortDb();

  const data = require('./data');

  outputFileSync(
    path.resolve(config.public_dir, 'index.html'),
    artTemplate(path.join(config.template_dir + '/index.html'), data()), 'utf8'
  );

  outputFileSync(
    path.resolve(config.public_dir, 'sitemap.xml'),
    artTemplate(path.join(config.template_dir + '/sitemap.xml'), data()), 'utf8'
  );

  require(config.postsDb).posts.forEach(post => {
    outputFileSync(path.resolve(config.public_dir, post.path),
      artTemplate(path.join(config.template_dir + '/post.html'), data(post)), 'utf8')
  });

  require(config.pagesDb).pages.forEach(page => {
    outputFileSync(path.resolve(config.public_dir, page.path),
      artTemplate(path.join(config.template_dir + '/page.html'), data(page)), 'utf8')
  });

  config.site_categories.forEach(category => {
    outputFileSync(path.resolve(config.public_dir, config.post_permalink,
      category.path), artTemplate(path.join(config.template_dir + '/category.html'), data(category.title)), 'utf8');
  })

};
