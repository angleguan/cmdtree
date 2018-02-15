const config = require('./config');
const posts = require(config.postsDb);
const pages = require(config.pagesDb);
const moment = require('moment');

module.exports = item => {

  let page = [];

  let currentCategory = [];

  if (typeof item === 'string') {

    currentCategory[0] = item;
    currentCategory[1] = [];

    posts.posts.forEach(post => {
      if (post.category === item) {
        currentCategory[1].push(post)
      }
    })

  } else {

    for (let i in item) {
      page[i] = item[i]
    }

  }

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
      url: config.site_url,
      posts: posts.posts,
      categories: site_categories,
      pages: pages.pages
    },
    page: {
      title: page['title'],
      date: f => moment(page['date']).format(f || 'YYYY-MM-DD'),
      category: page['category'],
      content: page['content']
    },
    category: currentCategory
  }
};
