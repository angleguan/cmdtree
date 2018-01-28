const config = require('../../config'),
  posts = require('../../posts');

module.exports = (data) => {
  return {
    site: {
      title: config.site.title,
      url: config.site.url,
      posts: posts.posts,
      categories: config.category,
    },
    content: data
  }
};