const path = require('path'),
  gConfig = require('../config');

module.exports = configInfo = {
  site_url: gConfig.site.url,
  template_dir: path.resolve(process.cwd(), gConfig.generator.template_dir),
  public_dir: path.resolve(process.cwd(), gConfig.generator.public_dir),
  source_dir: path.resolve(process.cwd(), gConfig.generator.source_dir),
  source_post_dir: path.resolve(process.cwd(), gConfig.generator.source_dir, 'post'),
  source_page_dir: path.resolve(process.cwd(), gConfig.generator.source_dir, 'page'),
  static_dir: path.resolve(process.cwd(), 'static'),
  post_permalink: gConfig.generator.posts_permalink,
  postsDb: path.resolve(process.cwd(), 'posts.json')
};
