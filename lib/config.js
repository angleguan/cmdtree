const path = require('path'),
  gConfig = require('../config');

module.exports = configInfo = {
  site_title: gConfig.site.title,
  site_url: gConfig.site.url,
  template_dir: path.resolve(process.cwd(), gConfig.generator.template_dir),
  public_dir: path.resolve(process.cwd(), gConfig.generator.public_dir),
  source_dir: path.resolve(process.cwd(), gConfig.generator.source_dir),
  source_post_dir: path.resolve(process.cwd(), gConfig.generator.source_dir, 'post'),
  source_page_dir: path.resolve(process.cwd(), gConfig.generator.source_dir, 'page'),
  static_dir: path.resolve(process.cwd(), 'static'),
  pics_dir: path.resolve(process.cwd(), 'pics'),
  post_permalink: gConfig.generator.posts_permalink,
  db_dir: path.resolve(process.cwd(), 'db'),
  postsDb: path.resolve(process.cwd(), 'db/posts.json'),
  pagesDb: path.resolve(process.cwd(), 'db/pages.json'),
  categories: gConfig.categories
};
