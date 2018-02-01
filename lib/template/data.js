const config = require('../config');
const posts = require(config.postsDb);
const moment = require('moment');

module.exports = item => {

  let page = [];
  let currentCategory = [];

  if (typeof item === 'string') {

    posts.posts.forEach(post => {
      if (post.category === item) {
        currentCategory.push(post)
      }
    })

  } else {

    for (let i in item) {
      page[i] = item[i]
    }

  }

  const formatDate = [
    moment(page['date']).format(),
    moment(page['date']).format('YYYY年M月D日')
  ];

  let site_categories = [];

  for (let item in config.categories) {
    site_categories.push({
      'title': item,
      'path': config.categories[item] + '.html'
    })
  }

  return {
    site: {
      title: config.site_title,
      url: process.platform === 'win32' ? 'http://localhost:8080' : config.site_url,
      posts: posts.posts,
      categories: site_categories,
    },
    // 传来的是文章对象，解析出内容
    page: {
      title: page['title'],
      date: formatDate,
      category: page['category'],
      content: page['content']
    },
    category: currentCategory
  }
};
