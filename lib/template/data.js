const config = require('../../config'),
  posts = require('../../posts');

module.exports = item => {

  const page = [];

  for (let i in item) {
    page[i] = item[i]
  }

  return {
    site: {
      title: config.site.title,
      url: process.platform === 'win32'? 'localhost:8080': config.site.url,
      posts: posts.posts,
      categories: config.category,
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
