const config = require('./config');
const posts = require(config.postsDb);
const pages = require(config.pagesDb);
const moment = require('moment');

module.exports = item => {

  // 页面信息
  let page = [];

  // 当前分类数组
  let currentCategory = [];

  if (typeof item === 'string') {
    // 当传入的对象为分类时

    // 直接将该分类名设为分类数组第一项，将该分类的所有文章信息存于第二项，类似于Jekyll的分类储存方式
    currentCategory[0] = item;
    currentCategory[1] = [];

    // 遍历所有文章 找出当前分类的文章并推入数组（currentCategory[1]）
    posts.posts.forEach(post => {
      if (post.category === item) {
        currentCategory[1].push(post)
      }
    })

  } else {
    // 当传入的item为单个文章或页面时，将该页面对象推入page数组

    for (let i in item) {
      page[i] = item[i]
    }

  }

  // 日期格式化
  const formatDate = [
    moment(page['date']).format(),
    moment(page['date']).format('YYYY年M月D日')
  ];

  // 站点所有分类数组
  let site_categories = [];

  for (let _category in config.categories) {
    site_categories.push({
      'title': _category,
      'path': config.categories[_category] + '.html'
    })
  }

  return {
    site: {
      title: config.site_title,
      url: process.platform === 'win32' ? 'http://localhost:8080' : config.site_url,
      posts: posts.posts,
      categories: site_categories,
      pages: pages.pages
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
