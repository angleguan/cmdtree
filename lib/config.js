const path = require('path');
const gConfig = require('../config');

let categories = [];

for (let _category in gConfig.categories) {
  categories.push({
    title: _category,
    path: gConfig.categories[_category] + '.html'
  })
}

module.exports = {
  site_title: gConfig.site.title,
  site_url: process.platform === 'linux' && process.XDG_CURRENT_DESKTOP === undefined ? gConfig.site.url : 'http://localhost:8080',
  site_categories: categories,
  template_dir: path.resolve(process.cwd(), gConfig.generator.template_dir),
  public_dir: path.resolve(process.cwd(), gConfig.generator.public_dir),
  static_dir: path.resolve(process.cwd(), 'static'),
  source_dir: path.resolve(process.cwd(), gConfig.generator.source_dir),
  source_post_dir: path.resolve(process.cwd(), gConfig.generator.source_dir, 'post'),
  source_page_dir: path.resolve(process.cwd(), gConfig.generator.source_dir, 'page'),
  pics_dir: path.resolve(process.cwd(), 'pics'),
  db_dir: path.resolve(process.cwd(), 'db'),
  postsDb: path.resolve(process.cwd(), 'db/posts.json'),
  pagesDb: path.resolve(process.cwd(), 'db/pages.json'),
  post_permalink: 'blog'
};
