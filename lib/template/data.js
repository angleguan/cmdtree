const config = require('../../config'),
  posts = require('../../posts');

module.exports = item => {

  const post = [];

  for (let i in item) {
    post[i] = item[i]
  }

  return {
    site: {
      title: config.site.title,
      url: process.platform === 'win32'? 'localhost:8080': config.site.url,
      posts: posts.posts,
      categories: config.category,
    },
    // 传来的是文章对象，解析出内容
    post: {
      title: post['title'],
      date: post['date'],
      category: post['category'],
      content: post['content']
    }
  }
};
