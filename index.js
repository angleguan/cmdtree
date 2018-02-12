const fs = require('fs-extra');
const rd = require('rd');
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const moment = require('moment');
const fm = require('./utils/front-matter');
const writeDb = require('./lib/db');
const config = require('./lib/config');

const md = new MarkdownIt({
  highlight: (str, lang) => {
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

    const fileName = formatFileName(filePath);

    const fContent = fm(fs.readFileSync(filePath, 'utf-8'));

    const page = {
      title: fContent.attributes.title || fileName,
      path: (fContent.attributes.path || fileName) + '.html',
      content: md.render(fContent.body),
      url: config.site_url + '/' + (fContent.attributes.path || fileName) + '.html'
    };

    writeDb.appendPagesDb(page);

  });

  rd.readFileSync(config.source_post_dir).forEach(filePath => {

    const fileName = formatFileName(filePath);

    const fContent = fm(fs.readFileSync(filePath, 'utf-8'));

    const __POST_DATE = {
      YEAR: moment(fContent.attributes.date).format('YYYY'),
      MONTH: moment(fContent.attributes.date).format('MM'),
      DAY: moment(fContent.attributes.date).format('DD')
    };

    const post = {
      title: fContent.attributes.title || fileName,
      date: f => moment(fContent.attributes.date).format(f || 'YYYY-MM-DD'),
      category: fContent.attributes.category || '杂文',
      conetnt: md.render(fContent.body),
      path: postLink(path.join(__POST_DATE.YEAR, __POST_DATE.MONTH, fileName)),
      url: config.site_url + '/' + post.path
    };

    writeDb.appendPostsDb(post);

  });

  writeDb.sortDb();

}
