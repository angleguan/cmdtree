const config = require('../config'),
  posts = require('../posts');

module.exports = {
  site: {
    title: config.site.title,
    url: config.site.url,
    posts: posts.posts,
    categories: config.category
  }
};