const path = require('path'),
  gConfig = require('../config');

module.exports = configInfo = {
  site_url: gConfig.site.url,
  public_dir: path.resolve(process.cwd(), gConfig.generator.public_dir),
  source_dir: path.resolve(process.cwd(), gConfig.generator.source_dir),
  postpermalink: gConfig.generator.posts_permalink,
  postsDb: path.resolve(process.cwd(), 'posts.json')
};
