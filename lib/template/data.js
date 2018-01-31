const config = require('../config');

const posts = require(config.postsDb);

module.exports = item => {

  const page = [];

  for (let i in item) {
    page[i] = item[i]
  }

  return {
    site: {
      title: config.site_title,
      url: process.platform === 'win32'? 'localhost:8080': config.site_url,
      posts: posts.posts,
      categories: config.categories,
    },
    // 传来的是文章对象，解析出内容
    page: {
      title: page['title'],
      date: page['date'],
      category: page['category'],
      content: page['content']
    }
  }
};
